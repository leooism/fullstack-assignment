import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBook } from "../../store/BookStore";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Authors = () => {
	const books = useSelector(selectBook);
	const navigate = useNavigate();
	return (
		<div className="flex relative justify-center px-2  flex-col gap-2  ">
			<h1 className="text-2xl text-gray-900">Top Authors</h1>
			<div className="flex py-2 w-full overflow-x-scroll  scrollbar-hide  px-2   gap-2">
				{books &&
					books.map((book) => (
						<div
							key={book.id}
							className=" flex   flex-col justify-evenly  cursor-pointer w-full h-full  "
							onClick={() => {
								navigate(`/author/${book.ISBN}`);
							}}
						>
							<div className="w-32 h-32 md:w-48 md:h-48 rounded-full  shadow-xl">
								<img
									src={book.img}
									alt={book.author}
									className="w-full h-full rounded-full"
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

export default Authors;
