const Router = require("express").Router();

const {
	getAllBook,
	addBook,
	getBook,
	deleteBook,
	updateBook,
} = require("../controllers/BookController");
const { protect, restrictTo } = require("../controllers/AuthController");

Router.get("/books", getAllBook);
Router.post("/books", protect, restrictTo(["admin"]), addBook);
Router.get("/books/:id", getBook);
Router.delete("/books/:id", protect, restrictTo(["admin"]), deleteBook);
Router.patch("/books/:id", protect, restrictTo(["admin"]), updateBook);

module.exports = { Router };
