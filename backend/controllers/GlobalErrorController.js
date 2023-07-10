const { Prisma } = require("@prisma/client");
const AppError = require("../utils/AppError");

const notFoundError = (error) => {
	return new AppError("Cannot find this data", 404);
};
const clientValidationError = (error) => {
	console.log(error);
	return new AppError(`${error.message}`, 404);
};
const uniqueConstraintViolation = (error) => {
	return new AppError(
		"There is a unique constraint violation, a new user book cannot be created with this detail",
		401
	);
};

const handleTokenExipredError = () => new AppError("Token exipred", 401);
const handleJWTError = () => new AppError("Invalid token", 401);
const sendErrorDev = (err, req, res) => {
	console.log(err);
	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	if (err.operational) {
		return res.status(err.statusCode).json({
			staus: err.status,
			message: err.message,
		});
	}

	console.log("Error 🔥🔥🔥🔥🔥🔥");

	return res.status(500).json({
		status: "Error",
		message: "something went very wrong",
	});
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "Error";

	if (process.env.Node_Env === "development") {
		sendErrorDev(err, req, res);
	}
	if (process.env.Node_Env === "production") {
		if (err.name === "NotFoundError") {
			err = notFoundError(err);
		}
		if (
			err instanceof Prisma.PrismaClientKnownRequestError &&
			err.code === "P2002"
		) {
			// The .code property can be accessed in a type-safe manner
			err = uniqueConstraintViolation(err);
		}

		if (err instanceof Prisma.PrismaClientValidationError) {
			err = clientValidationError(err);
		}

		if (err.name === "TokenExpiredError") {
			err = handleTokenExipredError();
		}
		if (err.name === "JsonWebTokenError") {
		}
		err = handleJWTError();

		sendErrorProd(err, req, res);
	}
};
