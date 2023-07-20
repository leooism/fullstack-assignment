import React, { useState } from "react";
import Button from "../UI/Button";
import {
	FaCcApplePay,
	FaCcMastercard,
	FaCcPaypal,
	FaCcVisa,
} from "react-icons/fa6";
import Avatar from "../UI/Avatar";
import { selectCartBook } from "../../store/BookStore";
import { useSelector } from "react-redux";
import calculateTotalAmount from "../../util/getTotalAmount";

const CheckoutPage = () => {
	const [shippingAddress, setShippingAddress] = useState({
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
	});

	const [paymentMethod, setPaymentMethod] = useState("");
	const cartBook = useSelector(selectCartBook);

	const handleSubmit = () => {
		console.log("Shipping address:", shippingAddress);
		console.log("Payment method:", paymentMethod);
	};

	return (
		<div className="flex items-center justify-around gap-4 p-3 flex-wrap">
			<div className="flex flex-col rounded-lg shadow-2xl bg-red   p-3 ">
				<h1 className="md:text-xl text-center text-gray-900 font-semibold">
					Confirm Your Details
				</h1>
				<form action="" className="flex flex-col gap-3">
					<div className="flex gap-2 items-center w-full justify-between">
						<div className="flex flex-col">
							<label
								htmlFor=""
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								First Name
							</label>
							<input
								type="text"
								className="border p-1"
								value={shippingAddress.city}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										city: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex flex-col ">
							<label
								htmlFor=""
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Last Name
							</label>
							<input
								type="text"
								className="border p-1"
								value={shippingAddress.city}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										city: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="flex gap-2 items-center  justify-between ">
						<div className="flex flex-col">
							<label
								htmlFor=""
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Shipping Address 1
							</label>
							<input
								type="text"
								className="border p-1"
								value={shippingAddress.address1}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										address1: e.target.value,
									})
								}
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor=""
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Shipping address 2
							</label>
							<input
								type="text"
								className="border p-1"
								value={shippingAddress.address2}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										address2: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Your email
						</label>
						<input
							type="email"
							id="email"
							aria-describedby="helper-text-explanation"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="name@gmail.com"
						/>
					</div>
					<div>
						<h1 className="block mb-2 text-sm font-medium text-gray-900">
							Select Your Payment Method
						</h1>

						<div className="flex gap-5">
							<FaCcMastercard
								color="red"
								className={`md:text-[80px] text-[40px] hover:scale-110 transition cursor-pointer ${
									paymentMethod === "mastercard" ? "scale-125 " : ""
								}`}
								onClick={() => {
									setPaymentMethod("mastercard");
								}}
							/>
							<FaCcVisa
								color="blue"
								className={`hover:scale-110 transition cursor-pointer ${
									paymentMethod === "visa" ? "scale-125 " : ""
								}
								md:text-[80px] text-[40px]
								`}
								onClick={() => {
									setPaymentMethod("visa");
								}}
							/>
							<FaCcPaypal
								color="yellow"
								className={`hover:scale-110 transition cursor-pointer ${
									paymentMethod === "paypal" ? "scale-125 " : ""
								}
								md:text-[80px] text-[40px]
								`}
								onClick={() => {
									setPaymentMethod("paypal");
								}}
							/>
							<FaCcApplePay
								className={`hover:scale-110 transition cursor-pointer ${
									paymentMethod === "applepay" ? "scale-125 " : ""
								}
								md:text-[80px] text-[40px]
								`}
								onClick={() => {
									setPaymentMethod("applepay");
								}}
							/>
						</div>
					</div>
					<div className="flex justify-end ">
						<Button
							text="Save"
							style="p-1 md:w-32 bg-blue-500 md:text-2xl text-white"
							buttonClickHandler={() => {
								console.log("");
							}}
						/>
					</div>
				</form>
			</div>
			<div className="flex flex-col rounded-lg shadow-2xl p-3 gap-2 ">
				{cartBook.map((bk, i) => (
					<div
						className="flex flex-col border-b-2 border-b-red-20 pb-2"
						key={i}
					>
						<div className="flex gap-5 items-center px-2 border-2 rounded-lg">
							<div className="relative">
								<img src={bk.img} alt="img" className="w-9 h-9 object-cover" />
								<div className="absolute animate-spin top-0 left-full px-1 rounded-full w-3 h-3 bg-red-300 text-[11px] text-white flex justify-center items-center">
									1
								</div>
							</div>
							<p className="text-[10px] w-3/4 flex-col 							block mb-2 text-sm font-medium text-gray-900">
								{bk.title}
							</p>
						</div>
					</div>
				))}
				<div className="flex flex-col p-3 border-b-2">
					<div className="flex justify-between">
						<p className="block mb-2 text-sm font-medium text-gray-900">
							Sub total
						</p>
						<p className="block mb-2 text-sm font-medium text-gray-900">
							${calculateTotalAmount<CartBookType>(cartBook)}
						</p>
					</div>
					<div className="flex justify-between">
						<p className="block mb-2 text-sm font-medium text-gray-900">
							Shipping fee
						</p>
						<p className="block mb-2 text-sm font-medium text-gray-900">$ 80</p>
					</div>
				</div>
				<div className="flex flex-col p-3 ">
					<div className="flex justify-between">
						<p className="block mb-2 text-sm font-medium text-gray-900">
							Sub total
						</p>
						<p className="block mb-2 text-sm font-medium text-gray-900">
							${calculateTotalAmount<CartBookType>(cartBook) + 80}
						</p>
					</div>
				</div>
				<Button
					text="Place Order"
					style="w-[90%] p-2 bg-gray-200 text-gray-900 font-medium mx-auto"
				/>
			</div>
		</div>
	);
};

export default CheckoutPage;
