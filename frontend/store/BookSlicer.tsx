import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Book } from "./BookStore";
const BookSlicer = createSlice({
	name: "BookStore",
	initialState: {
		books: [] as Book[],
	},
	reducers: {
		addItemToBookStore(store, { payload }: PayloadAction<Book[]>) {
			console.log(payload);
			store.books = payload;
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
