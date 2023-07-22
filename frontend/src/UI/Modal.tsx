import ReactDOM from "react-dom";
import Button from "../UI/Button";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToBookStore } from "../../store/BookStore";
const BackDrop = (props: { onshowModalHandler: () => void }) => {
	return (
		<div
			className="w-[100%] h-[100vh] bg-gray-300  absolute top-0 left-0 z-40 opacity-60"
			onClick={() => {
				props.onshowModalHandler();
			}}
		></div>
	);
};

const Modal = (props: { onshowModalHandler: () => void }) => {
	const [authorInputValue, setAuthorInputValue] = useState("");
	const [genreInputValue, setGenreInputValue] = useState("");
	const [priceMaxInputValue, setPriceMaxInputValue] = useState(200);
	const [priceMinInputValue, setPriceMinInputValue] = useState(1);
	const [sortByInputValue, setSortByInputValue] = useState("price");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const filterSubmitHandler = async (e: React.ClickEvent) => {
		e.preventDefault();
		/* f_name=${
				authorInputValue.split(" ")[0]
			}&l_name=${
				authorInputValue.split(" ")[1] ? authorInputValue.split(" ")[1] : ""
			} */
		const responseData = await axios.get(
			`http://localhost:8000/books?genre=${genreInputValue}&sort=${sortByInputValue}&price[gte]=${priceMinInputValue}&price[lte]=${priceMaxInputValue}`
		);

		const booksData = await responseData.data.books;
		if (booksData.length === 0) return;
		dispatch(
			addItemToBookStore(
				booksData.map((book) => ({
					id: book.id,
					title: book.title,
					ISBN: book.isbn,
					price: book.price,
					availability: book.availability,
					img: book.book_img,
					genre: book.genre,
					type: book.type,
					ratings: book.ratings,
					// author: `${book.author["f_name"]} ${book.author["l_name"]}`,
				}))
			)
		);
		setAuthorInputValue("");
		setGenreInputValue("");
		setPriceMaxInputValue("");
		setPriceMinInputValue("");
		setSortByInputValue("price");
		props.onshowModalHandler();
		navigate("/s");
	};
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop onshowModalHandler={props.onshowModalHandler} />,
				document.getElementById("backdrop") as HTMLDivElement
			)}

			{ReactDOM.createPortal(
				<div className="absolute top-[50vh]  left-[50vw] z-50 -translate-x-1/2 -translate-y-1/2  ">
					<div className="bg-white shadow-xl rounded-xl w-96 flex-col flex justify-center p-3">
						<h1 className="text-gray-900 font-semibold">Advance Filters</h1>
						<form
							action="post"
							className="flex flex-col  justify-center w-full "
							onSubmit={filterSubmitHandler}
						>
							<div className="flex justify-around">
								<div className="flex flex-col">
									<label
										htmlFor="genre"
										className="text-gray-900 mb-2 font-semibold "
									>
										Genre
									</label>
									<input
										value={genreInputValue}
										onChange={(e) => setGenreInputValue(e.target.value)}
										type="text"
										name="genre"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
										id="email"
									/>
								</div>
								<div className=" flex flex-col">
									<label
										htmlFor="author"
										className="text-gray-900 mb-2 font-semibold "
									>
										Author
									</label>
									<input
										value={authorInputValue}
										onChange={(e) => setAuthorInputValue(e.target.value)}
										type="text"
										name="author"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
										id="email"
									/>
								</div>
							</div>
							<div className="flex  flex-col">
								<p className="text-gray-900 mb-2 font-semibold text-center ">
									Price
								</p>
								<div className="flex flex-row justify-around">
									<input
										value={priceMinInputValue}
										onChange={(e) => setPriceMinInputValue(+e.target.value)}
										type="number"
										name="minPrice"
										placeholder="Min Price"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
									/>
									<input
										value={priceMaxInputValue}
										onChange={(e) => setPriceMaxInputValue(e.target.value)}
										type="number"
										name="min price"
										placeholder="Max Price"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
									/>
								</div>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-gray-900 font-semibold">Sort By</p>
								<select
									name="SortBy"
									id="sb"
									value={sortByInputValue}
									className="border-2 p-2 outline-none border-x-gray-400 rounded-lg w-32 mb-2"
									onChange={(e) => {
										setSortByInputValue(e.target.value);
									}}
								>
									<option value="price">Price</option>
									<option value="ratings">Ratings</option>
								</select>
							</div>

							<div className="flex ">
								<Button
									text="Cancel"
									style="p-2  w-32 mx-auto bg-red-400 shadow-lg text-white uppercase hover:shadow-3xl hover:scale-110 transition"
									buttonClickHandler={props.onshowModalHandler}
								/>
								<button
									type="submit"
									className="p-2  w-32 mx-auto bg-blue-400 rounded-lg shadow-lg text-white uppercase hover:shadow-3xl hover:scale-110 transition"
								>
									Apply
								</button>
							</div>
						</form>{" "}
					</div>
					,
				</div>,
				document.getElementById("overlay")
			)}
		</>
	);
};

export default Modal;
