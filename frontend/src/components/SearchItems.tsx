import React from "react";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { selectBook } from "../../store/BookStore";
import displayRatings from "../../util/displayRatings";

const SearchItems = () => {
	const booksData = useSelector(selectBook);
	console.log(booksData);

	return (
		<div className="flex flex-col items-center justify-between gap-4">
			<h1 className="text-xl font-semibold">Results</h1>
			{booksData.map((data, _i) => (
				<div
					className="flex shadow-lg gap-2  p-2 items-center justify-center rounded-lg"
					key={_i}
				>
					<img src={data.img} alt="text" className="w-32 h-32 object-contain" />
					<div className="flex flex-col">
						<div className="flex flex-col ">
							<h1 className="font-semibold text-sm">{data.title} </h1>
							<p className="text-xs text-gray-500"></p>

							<p className="flex">{displayRatings(data.ratings)}</p>
							<span>{data.ratings}</span>
						</div>
						<p className="text-gray-900 text-2xl font-semibold">
							${data.price}
						</p>
						<Button
							text="Add to Cart"
							style="p-2 w-28 md:w-32 text-sm bg-yellow-300 text-white"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default SearchItems;
