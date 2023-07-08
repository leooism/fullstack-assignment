const { getAllCart } = require("../controllers/CartController.js");

const CartRouter = require("express").Router();
console.log(getAllCart);
CartRouter.get("/cart", (req, res) => {});
module.export = CartRouter;
