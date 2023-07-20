const prisma = require("../prisma/prisma");
const AppError = require("../utils/AppError");

const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));

const getAllBook = catchAsync(async (req, res, next) => {
	let queryObject = { ...req.query };
	//Converting req.queury to meaningful objects for filtering
	["sort", "page", "fields", "limit"].forEach((dat) => delete queryObject[dat]);

	queryObject = Object.entries(queryObject).map((dat) => {
		//Check if query is filtering integer and includes {gt | gte | lt | lte: some value}
		if (
			typeof dat[1] === "object" &&
			("gte" in dat[1] || "gt" in dat[1] || "lte" in dat[1] || "lt" in dat[1])
		) {
			return {
				[dat[0]]: {
					[Object.keys(dat[1])[0]]:
						+dat[1].gte || +dat[1].lte || +dat[1].gt || +dat[1].lt,
				},
			};
		}

		return {
			[dat[0]]: {
				contains: dat[1],
			},
		};
	});

	let sortBy = [];

	//Sort by the pattern? asc-price, desc-price
	if (req.query.sort) {
		//Sort -> -price, price
		const sortByTitle = req.query.sort.split(",");
		sortBy = sortByTitle.map((title) => {
			const splitedString = title.split("-");
			if (splitedString.length === 1)
				return { [splitedString[0].trim()]: "asc" };
			return { [splitedString[1].trim()]: "desc" };
		});
	}

	const allBooks = await prisma.book.findMany({
		where: {
			AND: queryObject,
		},
		orderBy: sortBy,

		include: {
			author: true,
		},

		// skip: +req.query.page
		// 	? (+req.query.page - 1) * (+req.query.limit || 5)
		// 	: undefined,
		// take: +req.query.limit || 5,
	});

	///Aliasing -> top 5 books and so on

	if (allBooks.length === 0) return next(new AppError("No result found", 201));

	return res.json({
		status: "Ok",
		results: allBooks.length,
		message: "Sucessfull retrieved data",
		books: allBooks,
	});
});

const getBook = catchAsync(async (req, res, next) => {
	const id = req.params.id;

	// const dat = await prisma.author.findFirst({
	// 	where: {
	// 		books: {
	// 			some: {
	// 				isbn: req.isbn,
	// 			},
	// 		},
	// 	},
	// });
	const book = await prisma.book.findUniqueOrThrow({
		where: { id: id },
	});

	res.status(200).json({
		status: "Sucess",
		data: { ...book },
	});
});

const addBook = catchAsync(async (req, res, next) => {
	//Check every field is non empty

	const data = await prisma.book.create({
		data: {
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			isbn: req.body.isbn,
			genre: req.body.genre,
			book_img: req.body.book_img,
			publication_date: req.body.publication_date,
			availability: req.body.availability,
			ratings: req.body.ratings,
			author: {
				create: {},
			},
		},
	});

	return res.status(201).json({
		status: "Ok",
		message: "Book added sucessfully",
		data,
	});
});
const deleteBook = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const deletedBook = await prisma.book.delete({
		where: { id: id },
		include: { author: true },
	});

	if (!deleteBook) next(new AppError("No match witih this current id", 204));

	return res.status(200).json({
		status: "Sucess",
		data: deletedBook,
	});
});

const updateBook = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const isBookExist = await prisma.book.isDataExist("id", id);
	if (!isUserExist.id) return next(new AppError("No Book with this id", 204));
	const updatedBook = await prisma.book.update({
		where: { id: id },
		data: req.body,
		include: {
			author: true,
		},
	});

	return res.status(201).json({
		status: "Ok",
		message: "Updated sucessfully",
		data: updatedBook,
	});
});

module.exports = { getAllBook, getBook, deleteBook, updateBook, addBook };
