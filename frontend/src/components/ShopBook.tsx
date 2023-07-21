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
				className="flex  py-2 w-full overflow-x-scroll scrollbar-hide  px-2   gap-2 transition-all ease-linear duration-300"
			>
				{books ? (
					books.map((book) => (
						<ShopBookCard
							id={book.id}
							title={book.title}
							price={book.price}
							ISBN={book.ISBN}
							author={book.author}
							availability={book.availability}
							key={book.ISBN}
							img={book.img}
						/>
					))
				) : (
					<p>No items</p>
				)}
			</div>
			<div className="absolute flex w-full justify-between   ">
				<div
					className="bg-gray-200 p-2 rounded-full z-10 "
					onClick={() => {
						divScrollRef.scroll({
							behaviour: "smooth",
							left: -10,
						});
					}}
				>
					<FcPrevious className="text-white" />
				</div>
				<div
					className="bg-white p-2 rounded-full z-10"
					onClick={() => {
						divScrollRef.current.scrollBy({
							behaviour: "smooth",
							left: divScrollRef.current.getBoundingClientRect().width,
						});
					}}
				>
					<FcNext className="text-white" />
				</div>
			</div>
		</div>
	);
};

export default ShopBook;
