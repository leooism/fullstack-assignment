import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shopBookCardPropsType } from "../src/components/ShopBookCard";
import { CartBookType } from "./BookStore";

type OrderItemTYpe = {
	id: string;
	order_id: string;
	book_id: string;
	quantity: number;
};

type OrderType = {
	id: string;
	user_id: string;
	shipping_address: string;
	payment_method: string;
	status: string;
	created_at: Date;
	items: OrderItemTYpe;
};

export type userDetail = {
	id: string;
	username?: string | undefined;
	email: string | undefined;
	profileImage?: string | undefined;
	role?: string;
	cart_id: string;
};
type UserStoreType = {
	userDetail: userDetail;
	cart: Array<CartBookType>;
	orders: OrderType[];
};

const UserSlicer = createSlice({
	name: "User",
	initialState: {
		userDetail: {
			id: undefined,
			username: undefined,
			email: undefined,
			profileImage: undefined,
			role: undefined,
			cart_id: undefined,
		},
		cart: [] as Array<CartBookType>,
	} as unknown as UserStoreType,
	reducers: {
		loginUser(store, action: PayloadAction<userDetail>) {
			const user = {
				id: action.payload.id,
				username: action.payload.username,
				email: action.payload.email,
				profileImage: action.payload.profileImage,
				role: action.payload.role,
				cart_id: action.payload.cart_id,
			};
			store.userDetail = user;
			return store;
		},
		signupUser(store, action) {
			return store;
		},
		addItemsToCart(store, action: PayloadAction<Array<CartBookType>>) {
			console.log(action.payload);
			store.cart = action.payload;
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

export default UserSlicer;
