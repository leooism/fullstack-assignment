const prisma = require("../app");
const AppError = require("../utils/AppError");
module.export = prisma;

const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));

const getAllBook = catchAsync(async (req, res, next) => {
	let queryObject = { ...req.query };
	console.log(req.query.searchString);
	//Converting req.queury to meaningful objects for filtering
	["sort", "page", "fields", "limit"].forEach((dat) => delete queryObject[dat]);
	queryObject = Object.entries(queryObject).map((dat) => {
		if (dat[0] === "price" && typeof dat[1] === "object") {
			return {
				[dat[0]]: {
					[Object.keys(dat[1])[0]]:
						+dat[1].gte || +dat[1].lte || +dat[1].gt || +dat[1].lt,
				},
			};
		}
		if (dat[0] === "isbn") {
			return { [dat[0]]: dat[1] };
		}
		if (dat[0] === "title") {
			return {
				[dat[0]]: {
					contains: dat[1],
				},
			};
		}
		return {
			[dat[0]]: isNaN(dat[1]) ? dat[1] : +dat[1],
		};
	});

	let sortBy = [];
	if (req.query.sort) {
		const sortByTitle = req.query.sort.split(",");
		sortBy = sortByTitle.map((title) => {
			const splitedString = title.split("-");

			return { [splitedString[1]]: splitedString[0] };
		});
	}

	let page, limit;
	if (req.query.page && req.query.limit) {
		page = +req.query.page
			? (+req.query.page - 1) * +req.query.limit
			: undefined;
		limit = +req.query.limit;
	}

	const allBooks = await prisma.book.findMany({
		where: {
			AND: queryObject,
		},
		orderBy: sortBy,

		include: {
			author: true,
		},

		skip: page,
		take: limit,
	});

	///Aliasing -> top 5 books and so on

	if (allBooks.length === 0) return next(new AppError("No result found", 204));
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
	const isUserExist = await prisma.book.findUnique({
		where: { id: id },
	});
	console.log(isUserExist);
	if (!isUserExist.id) return next(new AppError("No user with this id", 204));
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
