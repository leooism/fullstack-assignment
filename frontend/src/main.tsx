import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "../store/BookStore.tsx";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckoutPage from "./components/Checkout";
import PageLayout from "./layout/PageLayout.tsx";
import LoginForm from "./components/Login.tsx";
import BookPage from "./components/BookPage.tsx";
import AdminLogin from "./components/AdminLogin.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import Signup from "./components/Signup";
import SearchItems from "./components/SearchItems";
import Admin from "./components/Admin.tsx";

import { loader } from "./components/Loader";
const router = createBrowserRouter([
	{
		path: "/",
		element: <PageLayout />,
		children: [
			{ index: true, element: <App /> },
			{
				path: "/s",
				element: <SearchItems />,
			},

			{
				path: "/book/:bookId",
				element: <BookPage />,
			},
		],
	},

	{
		path: "/fullstack-assignment",
		element: <AdminLayout />,
		children: [
			{
				path: "admin",
				element: <Admin />,
			},
			{
				path: "login",
				element: <AdminLogin />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
