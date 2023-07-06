import React from "react";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-center items-center h-[100vh] flex-col w-full gap-2">
			<h1 className="text-9xl font-bold">404</h1>
			<p>Page not found</p>
			<Button
				text="Go to main menu"
				style="bg-gray-900 text-white p-3"
				buttonClickHandler={() => {
					navigate("/");
				}}
			/>
		</div>
	);
};

export default ErrorPage;
