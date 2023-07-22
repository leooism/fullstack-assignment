import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { user } from "../../store/BookStore";
import displayRatings from "../../util/displayRatings";

const BookPage = () => {
	const { bookId } = useParams();
	const userDetail = useSelector(user);

	const [data, setData] = useState();
	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get(`http://localhost:8000/books/${bookId}`);
			setData(data.data.data);
			console.log(data);
		};

		fetchData();
	}, [bookId, setData]);
	// fetchData((data) => setData(data.data.data))

	return (
		<>
			{data && (
				<div className="flex justify-around  sm:flex-nowrap flex-wrap md:flex-nowrap">
					<div className="flex felx-1 flex-col w-80">
						<div className="flex shadow-lg rounded-lg ">
							<img
								src={data.book_img}
								alt="hello"
								className="md:w-96 md:h-96 w-full"
							/>
						</div>
					</div>
					<div className="flex md:w-1/2 w-[80%] shadow-lg rounded-lg flex-col gap-10 p-5">
						<div className="flex flex-col gap-2">
							<h1 className="font-bold md:text-3xl">{data.title}</h1>
							<div className="flex flex-col">
								<p className="md:text-2xl font-medium">Price: ${data.price} </p>
								<div className="flex text-red-600">
									{displayRatings(data.ratings)}
								</div>
							</div>
							<div className="flex gap-10 border-b-4 p-2 border-b-slate-300">
								<Button
									text="Add to Cart"
									style="p-2 text-xs md:text-sm md:p-2 text-white font-bold bg-pink-500"
									buttonClickHandler={() => {
										console.log("add item to cart");
									}}
								/>
								<Button
									text="Add to Favourite"
									style="p-2 text-xs md:p-2 text-sm font-bold border"
									buttonClickHandler={() => {
										console.log("add item to cart");
									}}
								/>
							</div>
						</div>
						<div className="pb-2 flex flex-col gap-4 border-b-slate-400 border-b ">
							<h1 className="md:text-2xl font-semibold capitalize">
								Product details 💗
							</h1>
							<p className="font-light md:text-lg w-[95%]">
								{data.description}
							</p>
						</div>
						<div className="pb-2 flex flex-col gap-4 border-b-slate-400 border-b ">
							<h1 className="md:text-2xl font-semibold capitalize">Reviews</h1>
							{userDetail.email && (
								<div className="flex flex-col gap-2 ">
									<textarea
										placeholder="Write your reivew "
										className="border w-full p-2 h-full"
									/>
									<Button
										text="Submit"
										style="md:p-2  md:text-xl bg-blue-500 text-white"
										buttonClickHandler={() => {
											console.log("first");
										}}
									/>
								</div>
							)}
							<div className="font-light text-2xl  flex flex-col gap-3 w-fit max-h-[400px] overflow-y-scroll scrollbar-hide">
								{data.reviews.map((review) => (
									<ReviewItem
										name="Bidhan Bhandari"
										message="lorem is the best thing in the world"
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookPage;
