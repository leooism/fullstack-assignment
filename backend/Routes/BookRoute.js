const Router = require("express").Router();

const {
	getAllBook,
	addBook,
	getBook,
	deleteBook,
	updateBook,
} = require("../controllers/BookController");

Router.route("/books").get(getAllBook);

Router.get("/books", getAllBook);
Router.post("/books", addBook);
Router.get("/books/:id", getBook);
Router.delete("/books/:id", deleteBook);
Router.patch("/books/:id", updateBook);

module.exports = { Router };
