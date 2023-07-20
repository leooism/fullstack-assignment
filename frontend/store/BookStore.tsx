/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import BookSlicer from "./BookSlicer";
import UserSlicer from "./UserSlicer";

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

const store = configureStore({
	reducer: {
		Books: BookSlicer.reducer,
		user: UserSlicer.reducer,
	},
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const selectBook = (state: RootState) => state.Books.books;
export const selectCartBook = (state: RootState) => state.user.cart;
export const user = (state: RootState) => state.user.userDetail;
