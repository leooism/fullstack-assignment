const Router = require("express").Router();

const {
	getAllBook,
	addBook,
	getBook,
	deleteBook,
	updateBook,
	addReview,
} = require("../controllers/BookController");
const {
	protect,
	restrictTo,
	isLoggedIn,
} = require("../controllers/AuthController");

Router.get("/books", getAllBook);

Router.get("/books/:id", getBook);

Router.post("/books", isLoggedIn, restrictTo(["admin"]), addBook);
Router.post("/books/review", isLoggedIn, addReview);
Router.delete("/books/:id", protect, restrictTo(["admin"]), deleteBook);
Router.patch("/books/:id", protect, restrictTo(["admin"]), updateBook);

module.exports = Router;
