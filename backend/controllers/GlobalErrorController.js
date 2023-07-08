const notFoundError = (err, req, res) => {
	return res.status(404).json({
		status: "Not found",
		message: err.message,
	});
};

const sendErrorDev = (err, req, res) => {
	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			staus: err.status,
			message: err.message,
		});
	}
	console.log(err.name);
	if (err.name === "NotFoundError") {
		console.log("error");
		return notFoundError(err, req, res);
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
		sendErrorProd(err, req, res);
	}
};
