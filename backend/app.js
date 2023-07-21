const express = require("express");

const BookRouter = require("./Routes/BookRoute");
const UserRouter = require("./Routes/UserRoute");
const cartRouter = require("./Routes/CartRoute");

const GlobalErrorHandler = require("./controllers/GlobalErrorController");
const AppError = require("./utils/AppError");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const CheckoutRouter = require("./Routes/CheckoutRoute");

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use(BookRouter);
app.use(cartRouter);
app.use(UserRouter);
app.use(CheckoutRouter);

app.all("*", (req, res, next) => {
	next(new AppError("Page not found", 404));
});

app.use(GlobalErrorHandler);

app.listen(8000, () => {
	console.log("listening in port 8000");
});
