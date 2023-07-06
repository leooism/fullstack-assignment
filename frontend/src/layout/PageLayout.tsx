import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
	return (
		<div className="flex flex-col gap-10">
			<Header loggedInStatus={false} />
			<Outlet />

			<Footer />
		</div>
	);
};

export default PageLayout;
