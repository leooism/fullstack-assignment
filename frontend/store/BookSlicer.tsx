import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Book } from "./BookStore";
const BookSlicer = createSlice({
	name: "BookStore",
	initialState: {
		books: [] as Book[],
	},
	reducers: {
		addItemToBookStore(store, action) {
			store.books = action.payload.map((book) => ({
				title: book.title,
				ISBN: book.isbn,
				price: book.price,
				availability: book.availability,
				img: book.book_img,
				genre: book.genre,
				type: book.type,
				author: `${book.author["f_name"]} ${book.author["l_name"]}`,
			}));
			return store;
		},
		filterItem(store, action) {
			// const copiedItem = store.books.slice();
			// store.books = copiedItem;
			// const a = copiedItem.some(
			// 	(itm) => itm.genre.toLowerCase === action.payload.toLowerCase
			// );
			// console.log(a);

			return store;
		},
	},
});
export default BookSlicer;
