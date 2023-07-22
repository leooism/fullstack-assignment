import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, addToCart, user } from "../../store/BookStore";
import axios from "axios";
import useHttp from "../hooks/use-http";
import Modal from "../UI/Modal";

const PageLayout = () => {
	const userDetail = useSelector(user);
	const [showModal, setShowModal] = useState(false);
	const [queryString, setQueryString] = useState("");

	const showModalHandler = () => {
		setShowModal((prev) => !prev);
	};
	const dispatch = useDispatch();
	const advanceFilterHandler = ({
		author,
		genre,
		maxPrice,
		minPrice,
		sort,
	}: {
		author: string;
		genre: string;
		maxPrice: number;
		minPrice: number;
		sort: string;
	}) => {
		setQueryString(
			`genre=${genre}&sort=${sort}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
		);
	};

	useEffect(() => {
		if (userDetail.id) {
			axios
				.get("http://localhost:8000/cart", {
					withCredentials: true,
				})
				.then(function (response) {
					const cartItem = response.data[0].cartItem.map((dat: any) => {
						return {
							id: dat.book.id,
							ISBN: dat.book.isbn,
							author: `${dat.book.author["f_name"]} ${dat.book.author["l_name"]}`,
							title: dat.book.title,
							price: dat.book.price,
							img: dat.book["book_img"],
							availability: dat.book.availability,
							quantity: dat.quantity,
							totalPrice: dat.totalPrice,
						};
					});

					dispatch(addItemsToCart(cartItem));
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}, [userDetail.id, dispatch]);
	return (
		<>
			{showModal ? (
				<div className="h-[100vh]">
					<Modal onshowModalHandler={showModalHandler} />
					<Header
						loggedInStatus={userDetail.email ? true : false}
						onshowModalHandler={showModalHandler}
						onAdvanceFilterHandler={advanceFilterHandler}
					/>
				</div>
			) : (
				<div className="flex flex-col gap-10">
					<Header
						loggedInStatus={userDetail.email ? true : false}
						onshowModalHandler={showModalHandler}
						queryString={queryString}
					/>
					<Outlet />

					<Footer />
				</div>
			)}
		</>
	);
};

export default PageLayout;
