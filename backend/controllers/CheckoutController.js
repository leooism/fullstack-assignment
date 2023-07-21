const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../prisma/prisma.js");
const AppError = require("../utils/AppError");
const DOLLAR_IN_CENTS = 100;

const catchAsync = (fn) => (req, res, next) =>
	fn(req, res, next).catch((err) => next(new AppError(err)));
module.exports.checkout = catchAsync(async (req, res, next) => {
	const line_items = req.body.items.map((id) =>
		prisma.ShoppingCartItem.findFirst({
			where: {
				book_id: id,
			},
			select: {
				totalPrice: true,
				quantity: true,

				book: {
					select: {
						title: true,
						book_img: true,
						description: true,
					},
				},
			},
		}).then((item) => ({
			price_data: {
				currency: "usd",

				product_data: {
					images: [item.book.book_img],
					description: item.book.description,
					name: item.book.title,
				},
				unit_amount: item.totalPrice * DOLLAR_IN_CENTS,
			},
			quantity: item.quantity,
		}))
	);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: await Promise.all(line_items),
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/success.html`,
		cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
	});
	res.status(200).json({ url: session.url });
});
