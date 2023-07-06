const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBook = async (req, res) => {
	const allBooks = await prisma.book.findMany();

	res.json({
		data: allBooks,
	});
};

const getBook = async (req, res) => {
	const id = req.params.id;

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: { id: id },
		});
		res.json({
			status: "Sucess",
			data: book,
		});
	} catch (error) {
		res.json({
			stats: "Bad",
			data: error,
		});
	}
};

const addBook = async (req, res) => {
	try {
		//check if book already exists
		// const isAllFieldValid = checkEveryFieldIsValid(req.body);
		// if (!isAllFieldValid)
		// 	return res.json({
		// 		staus: "Failed",
		// 		message: "Fill out all form correctly",
		// 	});

		const isAlreadyExistBook = await prisma.book.findFirst({
			where: { id: req.body.id },
		});

		if (isAlreadyExistBook)
			return res.json({
				status: "Failed",
				message: "Book already added",
			});

		await prisma.book.create({
			data: {
				author: req.body.author,
				availability: req.body.availability,
				img: req.body.img,
				id: req.body.id,
				price: +req.body.price,
				title: req.body.title,
				stocks: req.body.stocks,
				type: req.body.type,
			},
		});

		return res.json({
			status: "Okay",
			message: "Something Went Good",
		});
	} catch (err) {
		console.log(err);
		return res.json({
			status: "Bad",
			message: err,
		});
	}
};
const deleteBook = async (req, res) => {
	const id = req.params.id;
	try {
		const deletedBook = await prisma.book.delete({ where: { id: id } });

		res.json({
			status: "Sucess",
			data: deletedBook,
		});
	} catch (error) {
		res.json;
	}
};
const updateBook = async (req, res) => {
	const id = req.params.id;
	try {
		const updatedBook = await prisma.book.update({
			where: { id: id },
			data: req.body,
		});
		return res.json({
			status: "Ok",
			message: "Updated sucessfully",
			data: updatedBook,
		});
	} catch (er) {
		return res.json({
			status: "failed",
			message: er,
		});
	}
};

module.exports = { getAllBook, getBook, deleteBook, updateBook, addBook };
