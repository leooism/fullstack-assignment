const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
	name: "Hash method",
	model: {
		user: {
			async signup(
				email,
				password,
				confirmPassword,
				f_name,
				l_name,
				profileImage,
				role
			) {
				if (confirmPassword !== password) {
					throw new AppError("Password didn't match", 404);
				}
				const hashPassword = await bcrypt.hash(password, 10);
				await prisma.user.isDataDontExist("email", email);

				return await prisma.user.create({
					data: {
						email,
						password: hashPassword,
						f_name,
						l_name,
						role,
						profileImage,
					},
				});
			},
			async login(email, password) {
				if (email === "" || password === "")
					throw new AppError("Please provide all the details");

				//check if user exist
				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
					select: {
						id: true,
						email: true,
						password: true,
					},
				});
				if (!user) throw new AppError("No user with this detail", 404);

				const isPasswordCorrect = await bcrypt.compare(password, user.password);
				if (!isPasswordCorrect)
					throw new AppError("Either password or email is incorrect");

				return user;
			},
		},
		$allModels: {
			async isDataDontExist(uniqueIds, data) {
				// const getCurrentModel = Prisma.getExtensionContext(this);
				const isUserAlreadyExist = await prisma.user.findUnique({
					where: {
						[uniqueIds]: data,
					},
				});

				if (isUserAlreadyExist) {
					throw new AppError(`User with this ${uniqueIds} already exist`, 200);
				}
			},
		},
	},
});

module.exports = prisma;

const { Router } = require("./Routes/BookRoute");
const UserRouter = require("./Routes/UserRoute");
// const { cartRouter } = require("./Routes/CartRoute");
const GlobalErrorHandler = require("./controllers/GlobalErrorController");

const AppError = require("./utils/AppError");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// .then((data) => console.log(data));

app.use(Router);
app.use(UserRouter);

app.all("*", (req, res, next) => {
	next(new AppError("Page not found", 404));
});

app.use(GlobalErrorHandler);

app.listen(8000, () => {
	console.log("listening in port 8000");
});
