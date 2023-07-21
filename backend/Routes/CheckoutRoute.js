const { checkout } = require("../controllers/CheckoutController.js");
const CheckoutRouter = require("express").Router();
CheckoutRouter.post("/create-checkout-session", checkout);

module.exports = CheckoutRouter;
