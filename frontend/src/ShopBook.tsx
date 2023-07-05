import { useRef } from "react";
import ShopBookCard from "./ShopBookCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Book } from "../store/BookStore";

const ShopBook = ({ book }: { book: [string, Book[]] }) => {
	const divScrollRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex justify-center px-2  flex-col gap-2 max-w-[100%] relative">
			<h1 className="text-2xl font-bold">{book[0].toUpperCase()}</h1>
			<div
				ref={divScrollRef}
				className=" flex w-full py-2 flex-nowrap gap-2 overflow-x-scroll  scrollbar-hide"
			>
				{book[1].map((book) => (
					<ShopBookCard
						title={book.title}
						price={book.price}
						ISBN={book.ISBN}
						author={book.author}
						availability={book.availability}
						key={book.ISBN}
						img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
				))}
			</div>
			<div className="absolute w-full flex justify-between">
				<button
					onClick={() => {
						divScrollRef.current?.scrollBy({
							left: -200,
							behavior: "smooth",
						});
					}}
					className="p-2 drop-shadow-2xl bg-orange-300 rounded-full"
				>
					<GrLinkPrevious />
				</button>
				<button
					className="p-2 drop-shadow-2xl bg-orange-300 rounded-full"
					onClick={() => {
						divScrollRef.current?.scrollBy({
							left: 200,
							behavior: "smooth",
						});
					}}
				>
					<GrLinkNext />
				</button>
			</div>
		</div>
	);
};

export default ShopBook;
