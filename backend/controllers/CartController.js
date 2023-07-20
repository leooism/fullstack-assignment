const prisma = require("../prisma/prisma");
const AppError = require("../utils/AppError");

const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));

module.exports.getAllCartItem = catchAsync(async (req, res, next) => {
	const cartItems = await prisma.cart.findMany({
		where: {
			id: req.user.cart_id,
		},
		select: {
			cartItem: {
				select: {
					quantity: true,
					totalPrice: true,
					book: {
						select: {
							id: true,
							isbn: true,
							title: true,
							price: true,
							book_img: true,
							availability: true,
							author: {
								select: {
									f_name: true,
									l_name: true,
								},
							},
						},
					},
				},
			},
		},
	});

	res.status(200).json({
		...cartItems,
	});
});

module.exports.addItemToCart = catchAsync(async (req, res, next) => {
	const itemAlreadyInCart = await prisma.ShoppingCartItem.findFirst({
		where: {
			book_id: req.body.book_id,
		},
	});
	if (itemAlreadyInCart) {
		const data = await prisma.ShoppingCartItem.update({
			where: {
				book_id: req.body.book_id,
			},
			data: {
				quantity: itemAlreadyInCart.quantity + 1,
			},
		});
		return res.status(200).json({
			data,
		});
	}

	const item = await prisma.ShoppingCartItem.create({
		data: {
			cart_id: req.user.cart_id,
			book_id: req.body.book_id,
			quantity: req.body.quantity,
			totalPrice: Math.trunc(req.body.totalPrice),
		},
		include: {
			cart: true,
		},
	});

	res.status(200).json({
		status: "Ok",
		item,
	});
});

module.exports.updateCartItem = catchAsync(async (req, res, next) => {
	const itemId = req.params.cartItem;
	const item = await prisma.ShoppingCartItem.findUnique({
		where: {
			book_id: itemId,
		},
	});

	if (!item) return next(new AppError("No item with this id", 404));
	const quantity = item.quantity + 1;

	item.quantity = quantity;
	const updatedItem = await item.save();

	res.status(200).json({
		status: "Sucessful",
		updatedItem,
	});
});
