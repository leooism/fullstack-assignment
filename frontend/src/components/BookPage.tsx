import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import l1 from "../assets/reading-list.svg";
import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const BookPage = () => {
	const { bookId } = useParams();
	const { isLoading, error, fetchData } = useHttp(
		`http://localhost:8000/books/${bookId}`
	);
	const [data, setData] = useState();
	// fetchData((data) => setData(data.data.data))

	return (
		<>
			{isLoading ? (
				<p>Loading</p>
			) : (
				<div className="flex justify-around flex-wrap md:flex-nowrap">
					<div className="flex felx-1 flex-col w-80">
						<div className="flex shadow-lg rounded-lg ">
							<img src={l1} alt="hello" className="w-96 h-96" />
						</div>
					</div>
					<div className="flex w-1/2 shadow-lg rounded-lg flex-col gap-10 p-5">
						<div className="flex flex-col gap-2">
							<h1 className="font-bold text-3xl">data.title</h1>
							<div className="flex flex-col">
								<p>⭐⭐⭐⭐`</p>
								<p className="text-2xl font-medium">Price: </p>
							</div>
							<div className="flex gap-10 border-b-4 p-2 border-b-slate-300">
								<Button
									text="Add to Cart"
									style="p-3 w-40 text-white font-bold bg-pink-500"
									buttonClickHandler={() => {
										console.log("add item to cart");
									}}
								/>
								<Button
									text="Add to Favourite"
									style="p-3 w-40 font-bold border"
									buttonClickHandler={() => {
										console.log("add item to cart");
									}}
								/>
							</div>
						</div>
						<div className="pb-2 flex flex-col gap-4 border-b-slate-400 border-b ">
							<h1 className="text-3xl font-semibold capitalize">
								Product details 💗
							</h1>
							<p className="font-light text-2xl w-[95%]">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Exercitationem amet impedit repellat iste a eius quam sit? Sit,
								magnam aspernatur.
							</p>
						</div>
						<div className="pb-2 flex flex-col gap-4 border-b-slate-400 border-b ">
							<h1 className="text-3xl font-semibold capitalize">
								Reviews 🪟🪟🪟
							</h1>
							<div className="flex flex-col gap-2 w-[60%]">
								<textarea
									placeholder="Write your reivew "
									className="border w-full p-2 h-full"
									rows={10}
								/>
								<Button
									text="Submit"
									style="p-3 w-60 text-2xl bg-blue-500 text-white"
									buttonClickHandler={() => {
										console.log("first");
									}}
								/>
							</div>
							<div className="font-light text-2xl  flex flex-col gap-3 w-fit max-h-[400px] overflow-y-scroll scrollbar-hide">
								<ReviewItem
									name="Bidhan Bhandari"
									message="lorem is the best thing in the world"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookPage;
