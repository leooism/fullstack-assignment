const prisma = require("../prisma/prisma");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));

const checkPasswordChangedAfterTokenCreated = (
	tokenTimeStamp,
	passwordChangedAt
) => {
	if (passwordChangedAt) {
		return tokenTimeStamp > parseInt(+new Date(passwordChangedAt) / 1000, 10);
	}
	return false;
};
const createToken = (id) =>
	jwt.sign({ id: id }, process.env.MY_SUPER_SECRET_KEY, {
		expiresIn: process.env.expiresIn,
	});
const createSendJson = (user, res) => {
	const token = createToken(user.id);
	res.cookie("jwt", token, {
		expires: new Date(
			Date.now() + parseInt(process.env.expiresIn) * 24 * 60 * 60
		),
		httpOnly: true,
	});
	res.status(200).json({
		status: "ok",
		token,
		data: user,
	});
};
module.exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await prisma.user.login(email, password);

	const token = createToken(user.id);

	return createSendJson(user, res);
});

module.exports.signup = catchAsync(async (req, res, next) => {
	const {
		email,
		password,
		confirmPassword,
		f_name,
		l_name,
		profileImage,
		role,
	} = req.body;
	const user = await prisma.user.signup(
		email,
		password,
		confirmPassword,
		f_name,
		l_name,
		profileImage,
		role
	);

	return createSendJson(user, res);
});

module.exports.protect = catchAsync(async (req, res, next) => {
	//Check if token exist
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (token === "null")
		return next(new AppError("You are not logged in, please log in", 404));

	//Verify token
	const decoded = await promisify(jwt.verify)(
		token,
		process.env.MY_SUPER_SECRET_KEY
	);

	//Check if user still exists

	const freshUser = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
	});
	if (!freshUser)
		return next(
			AppError("The user belonging to this token does not exist", 404)
		);

	//check if user changed password after the token was issued
	const isPasswordChanged = checkPasswordChangedAfterTokenCreated(
		decoded.iat,
		freshUser.passwordChangedAt
	);

	if (isPasswordChanged)
		return next(
			new AppError("Password is changed after the user logged in", 404)
		);

	req.user = freshUser;
	next();
});
module.exports.isLoggedIn = catchAsync(async (req, res, next) => {
	if (!req.cookies.jwt)
		return next(new AppError("You are not logged in please login"));
	let token = req.cookies.jwt;
	const decoded = await promisify(jwt.verify)(
		token,
		process.env.MY_SUPER_SECRET_KEY
	);

	//Check if user still exists

	const freshUser = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
	});
	if (!freshUser)
		return next(
			AppError("The user belonging to this token does not exist", 404)
		);

	//check if user changed password after the token was issued
	const isPasswordChanged = checkPasswordChangedAfterTokenCreated(
		decoded.iat,
		freshUser.passwordChangedAt
	);

	if (isPasswordChanged)
		return next(
			new AppError("Password is changed after the user logged in", 404)
		);

	req.user = freshUser;
	next();
});

module.exports.restrictTo =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(new AppError("You are not authorized to use this", 401));
		next();
	};

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
	//Get user email and check if user exist
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			email: req.body.email,
		},
		select: {
			email: true,
			saveResetToken: true,
		},
	});

	console.log(user);
	if (!user) next(new AppError("This user does not exist", 404));

	//Create passwordreset token and set expiry date to token
	const hash = crypto
		.createHash("sha256")
		.update(process.env.MY_SUPER_SECRET_KEY)
		.digest("hex");

	user.passwordResetToken = hash;

	await user.saveResetToken();

	//Send email,
	await sendEmail({
		to: req.body.email,
		subject: "Password Reset Token",
		token: hash,
	});
	//Send response
	res.status(200).json({
		status: "Ok",
		message: "Please check your email, We have sent you reset link",
	});
});

module.exports.resetPassword = catchAsync(async (req, res, next) => {
	//get token and compare the token
	const token = req.params.token;
	const { password, confirmPassword } = req.body;
	const user = await prisma.user.findFirst({
		where: {
			passwordResetToken: token,
		},
	});
	if (!user)
		return next(new AppError("Token is invalid or token expires", 404));
	//Get the corresponding user
	if (password !== confirmPassword)
		return next(new AppError("Password didn't match", 200));

	//Change password
	//Save the password
	user.password = password;
	await user.updatePassword();
	//Send response
	res.status(200).json({
		status: "Ok",
		message: "Password Changed sucessfully",
	});
});
