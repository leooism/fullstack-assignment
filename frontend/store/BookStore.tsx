/* eslint-disable react-refresh/only-export-components */
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

type BookCategoryType = string;
export type CartBookType = {
	quantity: number;
	totalPrice: number;
} & shopBookCardPropsType;

export type Book = {
	genre: string;
	type: BookCategoryType;
	stocks: number;
} & shopBookCardPropsType;

import { shopBookCardPropsType } from "../src/ShopBookCard";
export type BookStoreType = {
	books: {
		fiction: Book[];
		drama: Book[];
		romance: Book[];
		autoBiography: Book[];
	};
};

const BookSlicer = createSlice({
	name: "BookStore",
	initialState: {
		books: {
			fiction: [
				{
					type: "Hot",
					ISBN: "234",
					title: "How to win friends and Influence people",
					author: "Dale Cargne",
					availability: "rare",
					price: 200,
					genre: "Fiction",
					img: "https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400",
					stocks: 10,
				},
			],
			drama: [
				{
					type: "Recent",
					ISBN: "3212",
					title: "Love till death",
					author: "Marnus Labuchhane",
					availability: "rare",
					price: 300,
					genre: "Drama",
					img: "https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400",
					stocks: 10,
				},
			],
			romance: [
				{
					type: "Most Wanted",
					ISBN: "23033--4",
					title: "Sex Education",
					author: "David Warner",
					availability: "rare",
					price: 240,
					genre: "Romance",
					img: "https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400",
					stocks: 10,
				},
			],
			autoBiography: [
				{
					type: "Hot",
					ISBN: "aa-nnn-dddd-zzzzz-sss",
					title: "Priyanka Jonas Chopra",
					author: "Priyanka Chopra",
					availability: "rare",
					price: 200,
					genre: "autoBiography",
					img: "https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400",
					stocks: 10,
				},
			],
		},
	} as BookStoreType,
	reducers: {},
});

type UserStoreType = {
	userDetail: {
		username: string | undefined;
		email: string | undefined;
		profileImage: string | undefined;
		isLoggedIn: boolean;
	};
	cart: Array<CartBookType>;
};
const User = createSlice({
	name: "User",
	initialState: {
		userDetail: {
			username: undefined,
			email: undefined,
			profileImage: undefined,
			isLoggedIn: false,
		},
		cart: [] as Array<CartBookType>,
	} as UserStoreType,
	reducers: {
		login(store, action: PayloadAction<{ email: string; password: string }>) {
			const { email, password } = action.payload;
			store.userDetail.email = email;
			store.userDetail.username = password;
			return store;
		},
		signup(store, payload) {
			return store;
		},
		addToCart(
			store,
			action: PayloadAction<shopBookCardPropsType>
		): UserStoreType {
			//Check if already store

			const isAlreadyInCartIndex = store.cart.findIndex(
				(el) => el.ISBN === action.payload.ISBN
			);
			if (isAlreadyInCartIndex === -1) {
				store.cart.push({
					...action.payload,
					quantity: 1,
					totalPrice: action.payload.price,
				});
				return store;
			}

			store.cart[isAlreadyInCartIndex].quantity++;

			store.cart[isAlreadyInCartIndex].totalPrice =
				store.cart[isAlreadyInCartIndex].price *
				store.cart[isAlreadyInCartIndex].quantity;
			return store;
		},
		incrementItem(
			store,
			action: {
				type: string;
				payload: string;
			}
		) {
			//check if id match
			const isIdMatched = store.cart.findIndex(
				(itm) => itm.ISBN === action.payload
			);
			if (isIdMatched === -1) return store;

			store.cart[isIdMatched].quantity++;
			store.cart[isIdMatched].totalPrice =
				store.cart[isIdMatched].price * store.cart[isIdMatched].quantity;

			return store;
		},
		decrementItem(store, action: PayloadAction<string>) {
			const isIdMatched = store.cart.findIndex(
				(itm) => itm.ISBN === action.payload
			);
			if (isIdMatched === -1) return store;
			store.cart[isIdMatched].quantity--;

			if (store.cart[isIdMatched].quantity === 0) {
				store.cart = store.cart.filter((item) => item.ISBN !== action.payload);
				return store;
			}

			store.cart[isIdMatched].totalPrice =
				store.cart[isIdMatched].price * store.cart[isIdMatched].quantity;

			return store;
		},
	},
});

export const { addToCart, decrementItem, incrementItem } = User.actions;

const store = configureStore({
	reducer: {
		Books: BookSlicer.reducer,
		user: User.reducer,
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
