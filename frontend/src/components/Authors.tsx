import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBook } from "../../store/BookStore";
import { FcNext, FcPrevious } from "react-icons/fc";
const Authors = () => {
	const books = useSelector(selectBook);
	return (
		<div className="flex relative justify-center px-2  flex-col gap-2  ">
			<h1 className="text-2xl text-gray-900">Top Authors</h1>
			<div className="flex  py-2 w-full overflow-x-scroll justify-center scrollbar-hide  px-2   gap-2">
				{books &&
					books.map((book) => (
						<div className="h-36 w-36 rounded-full bg-white  border-2 border-transparent flex gap-2 flex-col items-center justify-evenly  shadow-2xl   hover:border-2 transition hover:border-gray-400  ">
							<div
								className=" flex   flex-col justify-evenly  cursor-pointer w-full h-full  "
								onClick={() => {
									navigate(`/author/${ISBN}`);
								}}
							>
								<img
									src={book.img}
									alt={book.title}
									className="mx-auto w-full rounded-full h-full    object-cover "
								/>
							</div>
						</div>
					))}
			</div>
			<div className="absolute flex w-full justify-between z-50">
				<div className="bg-white p-2 rounded-full">
					<FcPrevious
						className="text-white"
						onClick={() => {
							divScrollRef.scroll({
								behaviour: "smooth",
							});
						}}
					/>
				</div>
				<div className="bg-white p-2 rounded-full">
					<FcNext
						className="text-white"
						onClick={() => {
							divScrollRef.current.scroll({
								behaviour: "smooth",
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Authors;
