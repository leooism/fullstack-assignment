const {
	login,
	signup,
	forgotPassword,
	resetPassword,
} = require("../controllers/AuthController");

const UserRouter = require("express").Router();

UserRouter.post("/user/login", login);
UserRouter.post("/user/signup", signup);

UserRouter.post("/user/forgotPassword", forgotPassword);
UserRouter.post("/user/resetPassword/:token", resetPassword);
module.exports = UserRouter;
