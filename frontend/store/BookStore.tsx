import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import BookSlicer from "./BookSlicer";
import UserSlicer from "./UserSlicer";
import thunk from "redux-thunk";
import axios from "axios";

type BookCategoryType = string;
import { shopBookCardPropsType } from "../src/components/ShopBookCard";
export type CartBookType = {
	id: string;
	quantity: number;
	totalPrice: number;
} & shopBookCardPropsType;

export type Book = {
	id: string;
	genre: string;
	ratings: number;
	type: BookCategoryType;
} & shopBookCardPropsType;

export const {
	addToCart,
	decrementItem,
	incrementItem,
	loginUser,
	addItemsToCart,
	signupUser,
} = UserSlicer.actions;
export const { addItemToBookStore, filterItem } = BookSlicer.actions;

const logger = () => (next) => (action) => {
	console.log(action);
	next(action);
};

const addItemsToCartAsync = (
	title,
	author,
	ISBN,
	price,
	availability,
	img,
	id
) => {
	return async (dispatch) => {
		try {
			const item = { title, author, ISBN, price, availability, img, id };
			await axios.post(
				"http://localhost:8000/cart/addItemToCart",
				{
					book_id: id,
					quantity: 1,
					totalPrice: price,
				},
				{
					withCredentials: true,
				}
			);

			dispatch(addToCart(item));
		} catch (error) {
			console.log(error);
		}
	};
};

const store = configureStore({
	reducer: {
		Books: BookSlicer.reducer,
		user: UserSlicer.reducer,
	},
	middleware: [logger, thunk],
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const selectBook = (state: RootState) => state.Books.books;
export const selectCartBook = (state: RootState) => state.user.cart;
export const user = (state: RootState) => state.user.userDetail;
export { addItemsToCartAsync };
