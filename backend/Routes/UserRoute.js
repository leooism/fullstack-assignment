const { login, signup } = require("../controllers/AuthController");

const UserRouter = require("express").Router();

UserRouter.post("/user/login", login);
UserRouter.post("/user/signup", signup);
module.exports = UserRouter;
