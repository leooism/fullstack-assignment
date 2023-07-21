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
import Admin from "./components/Admin.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PageLayout />,

		children: [
			{ index: true, element: <App /> },

			{
				path: "/book/:bookId",
				element: <BookPage />,
			},
			{
				path: "/login",
				element: <LoginForm />,
			},
			{
				path: "/signup",
				element: <Signup />,
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
