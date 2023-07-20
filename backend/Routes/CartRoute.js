const { protect, isLoggedIn } = require("../controllers/AuthController");
const {
	getAllCartItem,
	addItemToCart,
	updateCartItem,
} = require("../controllers/CartController");

const CartRoute = require("express").Router();

CartRoute.get("/cart", isLoggedIn, getAllCartItem);
CartRoute.post("/cart/addItemToCart", isLoggedIn, addItemToCart);
CartRoute.post("/cart/updateCartItem/:cartItem", isLoggedIn, updateCartItem);

module.exports = CartRoute;
