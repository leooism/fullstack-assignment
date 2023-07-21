import { useMemo, useEffect } from "react";
import Hero from "./components/Hero";
import Shopping from "./components/Shopping";
import { addItemToBookStore } from "../store/BookStore";
import { useDispatch } from "react-redux";
import useHttp from "./hooks/use-http";
import axios from "axios";
function App() {
	const { isLoading, error } = useHttp("http://localhost:8000/books");
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get("http://localhost:8000/books").then((response) => {
			dispatch(
				addItemToBookStore(
					response.data.books.map((book: any) => {
						return {
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
						};
					})
				)
			);
		});
	}, [dispatch]);

	return (
		<div className="flex  flex-col gap-10  w-11/12 mx-auto">
			<Hero />

			{isLoading ? <p>Loading</p> : <Shopping />}
			{error ? <p>error</p> : <></>}
		</div>
	);
}

export default App;
