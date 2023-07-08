const { PrismaClient } = require("@prisma/client");
const AppError = require("../utils/AppError");
const prisma = new PrismaClient();
module.export = prisma;

const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));

const getAllBook = catchAsync(async (req, res) => {
	let queryObject = { ...req.query };
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
			const dividerIndex = title.split("").findIndex((el) => el === "-");
			const method = title.slice(0, dividerIndex);
			const sortByTitle = title.slice(dividerIndex + 1, title.length);

			return { [sortByTitle]: method };
		});
	}
	let page, limit;
	if (req.query.page && req.query.limit) {
		console.log("first");
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
	if (!book) return next(new AppError("No book found", 204));
	res.status(200).json({
		status: "Sucess",
		data: { ...book },
	});
});

const addBook = catchAsync(async (req, res, next) => {
	//Check every field is non empty

	const isBookAlreadyExist = await prisma.book.findUnique({
		where: {
			title_isbn: {
				isbn: req.body.isbn,
				title: req.body.title,
			},
		},
	});

	if (isBookAlreadyExist) return next(new AppError("Book Already exist"));
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
				create: {
					f_name: req.body.author.f_name,
					l_name: req.body.author.l_name,
					author_image: req.body.author.author_image,
					email: req.body.author.email,
				},
			},
		},
		include: {
			author: true,
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
