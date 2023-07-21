import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBook } from "../../store/BookStore";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const PopularBooks = () => {
	const books = useSelector(selectBook)
		.slice()
		.filter((book) => book.ratings >= 4.5);
	const navigate = useNavigate();
	const divScrollRef = useRef<HTMLDivElement>(null);
	return (
		<div className="flex relative justify-center px-2  flex-col gap-2  ">
			<h1 className="text-2xl text-gray-900">Highly Rated Books</h1>
			<div
				ref={divScrollRef}
				className="flex  py-2 w-full overflow-x-scroll scrollbar-hide  px-2   gap-2"
			>
				{books &&
					books.map((book) => (
						<div
							className=" flex   flex-col justify-evenly  cursor-pointer w-full h-full  "
							key={book.id}
							onClick={() => {
								navigate(`/author/${book.ISBN}`);
							}}
						>
							<div className="w-40  md:w-60  rounded-lg  shadow-xl">
								<img
									src={book.img}
									alt={book.author}
									className="w-full  rounded-lg object-contain"
								/>
							</div>
						</div>
					))}
			</div>
			<div className="absolute flex w-full justify-between z-50">
				<div className="bg-white p-2 rounded-full">
					<FcPrevious className="text-white" />
				</div>
				<div className="bg-white p-2 rounded-full">
					<FcNext className="text-white" />
				</div>
			</div>
		</div>
	);
};

export default PopularBooks;
