import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "../store/BookStore.tsx";
import "./index.css";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./Checkout";
import PageLayout from "./layout/PageLayout.tsx";
import LoginForm from "./Login.tsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <PageLayout />,
		errorElement: <ErrorPage />,

		children: [
			{ path: "/", element: <App /> },
			{
				path: "/checkout",
				element: <Checkout />,
			},
			{
				path: "/book/:bookId",
				element: <h1>Hola!</h1>,
			},
		],
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
