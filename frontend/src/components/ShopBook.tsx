import { useRef } from "react";
import ShopBookCard from "./ShopBookCard";
import { useSelector } from "react-redux";
import { selectBook } from "../../store/BookStore";
import { FcNext, FcPrevious } from "react-icons/fc";

const ShopBook = () => {
	const divScrollRef = useRef<HTMLDivElement>(null);
	const books = useSelector(selectBook);
	return (
		<div className="flex relative justify-center px-2  flex-col gap-2  ">
			<h1 className="text-2xl text-gray-900">Books</h1>
			<div
				ref={divScrollRef}
				className="flex  py-2 w-full overflow-x-scroll scrollbar-hide  px-2   gap-2"
			>
				{books ? (
					books.map((book) => (
						<ShopBookCard
							title={book.title}
							price={book.price}
							ISBN={book.ISBN}
							author={book.author}
							availability={book.availability}
							key={book.ISBN}
							img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
						/>
					))
				) : (
					<p>No items</p>
				)}
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

export default ShopBook;
