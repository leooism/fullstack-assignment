const prisma = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
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
module.exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await prisma.user.login(email, password);

	const token = jwt.sign({ id: user.id }, process.env.MY_SUPER_SECRET_KEY, {
		expiresIn: process.env.expiresIn,
	});
	return res.status(200).json({
		status: "Ok",
		token,
	});
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
	const token = jwt.sign({ id: user.id }, process.env.MY_SUPER_SECRET_KEY, {
		expiresIn: process.env.expiresIn,
	});

	return res.status(202).json({
		status: "Ok",
		data: user,
		token,
	});
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

	//Verify token
	const decoded = await promisify(jwt.verify)(
		token,
		process.env.MY_SUPER_SECRET_KEY
	);
	console.log(decoded.id);

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
	// // console.log(jwt.verify());
	// //check if user changed password after the token was issued
	const isPasswordChanged = checkPasswordChangedAfterTokenCreated(
		decoded.iat,
		freshUser.passwordChangedAt
	);
	if (!isPasswordChanged)
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
