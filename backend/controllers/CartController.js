const prisma = require("../prisma/prisma");
const AppError = require("../utils/AppError");
const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(err));
module.exports.getAllCartItem = catchAsync(async (req, res, next) => {
	const cartItems = await prisma.cart.findFirst({
		where: {
			id: req.user.cart_id,
		},
		include: {
			cartItem: true,
		},
	});

	res.status(200).json({
		cartItems,
	});
});

module.exports.addItemToCart = catchAsync(async (req, res, next) => {
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

	const item = await prisma.ShoppingCartItem.findFirst({
		where: {
			id: itemId,
		},
	});
	if (!item) return next(new AppError("No item with this id", 404));
	const quantity = req.body.quantity;
	const totalPrice = req.body.price;

	(item.quantity = quantity), (item.totalPrice = totalPrice);
	const updatedItem = await item.save();

	res.status(200).json({
		status: "Sucessful",
		updatedItem,
	});
});
