import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import Shopping from "./Shopping";
import Footer from "./Footer";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	return (
		<div className="flex  flex-col gap-10 ">
			<Header loggedInStatus={isLoggedIn} />
			<Hero />
			<Shopping />
			<Footer />
		</div>
	);
}

export default App;
