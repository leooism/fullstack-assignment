const express = require("express");
const { Router } = require("./Routes/BookRoute");
const { cartRouter } = require("./Routes/CartRoute");
const GlobalErrorHandler = require("./controllers/GlobalErrorController");

const AppError = require("./utils/AppError");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// .then((data) => console.log(data));

app.use(Router);
// app.use(cartRouter);

//For error handling in node js to use middle ware ->
// app.use((err, req, res, next) => {}) this is error handling middleware

//For all unhandled route
app.all("*", (req, res, next) => {
	next(new AppError("Page not found", 404));
});

app.use(GlobalErrorHandler);

app.listen(8000, () => {
	console.log("listening in port 8000");
});
