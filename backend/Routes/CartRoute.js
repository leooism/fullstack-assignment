const { protect } = require("../controllers/AuthController");
const {
	getAllCartItem,
	addItemToCart,
	updateCartItem,
} = require("../controllers/CartController");

const CartRoute = require("express").Router();

CartRoute.get("/cart", protect, getAllCartItem);
CartRoute.post("/cart/addItemToCart", protect, addItemToCart);
CartRoute.post("/cart/updateCartItem/:cartItem", protect, updateCartItem);

module.exports = CartRoute;
