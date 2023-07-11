const express = require("express");

const BookRouter = require("./Routes/BookRoute");
const UserRouter = require("./Routes/UserRoute");
const cartRouter = require("./Routes/CartRoute");
const GlobalErrorHandler = require("./controllers/GlobalErrorController");
const AppError = require("./utils/AppError");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// .then((data) => console.log(data));

app.use(cartRouter);
app.use(BookRouter);
app.use(UserRouter);

app.all("*", (req, res, next) => {
	next(new AppError("Page not found", 404));
});

app.use(GlobalErrorHandler);

app.listen(8000, () => {
	console.log("listening in port 8000");
});
