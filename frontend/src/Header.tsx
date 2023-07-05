import Logo from "./assets/logo.svg";
import Button from "./UI/Button";
import { FaSearchengin } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

import Avatar from "./UI/Avatar";
import { useState } from "react";
import Cart from "./Cart";
import { selectCartBook } from "../store/BookStore";
type HeaderPropsType = {
	loggedInStatus: boolean;
};
const Header = ({ loggedInStatus }: HeaderPropsType) => {
	const [showCart, setShowCart] = useState(false);
	const showCartHandler = (): void => setShowCart((prev) => !prev);
	const cartBook = useSelector(selectCartBook);

	return (
		<div className="flex w-full items-center  justify-between  gap-2 sticky top-0 left-0 z-50 bg-white  border  shadow-2xl">
			<div className={"flex flex-col justify-center w-fit  px-4"}>
				<div className="flex justify-center">
					<img src={Logo} alt="" className={"w-10 h-10"} />
				</div>
				<h1 className="text-lg text-center font-serif font-extrabold">
					KitabiGyan
				</h1>
			</div>
			<div className=" flex  flex-row gap-5 items-center border p-2  rounded-lg justify-between">
				<input
					type="text"
					placeholder="Search Books"
					className=" text-lg border-0 outline-none "
				/>
				<div className="flex justify-center items-center flex-1 hover:scale-125 hover:transition-all cursor-pointer">
					<FaSearchengin fontSize="20" />
				</div>
			</div>
			{!loggedInStatus ? (
				<div className="flex gap-2">
					<Button
						text="Log In"
						style="text-sm hover:bg-gradient-to-l from-red-500 to-blue-500 hover:text-white "
						buttonClickHandler={() => {
							console.log("hi");
						}}
					/>

					<Button
						text="Sign Up"
						style="text-sm bg-gradient-to-r from-green-500 to-yellow-500 text-white"
						buttonClickHandler={() => {
							console.log("hi");
						}}
					/>
				</div>
			) : (
				<div className="flex flex-1 relative">
					<div className="flex-1 flex justify-between items-center">
						<button
							className={`h-10 w-10 relative shadow-lg flex items-center justify-center p-2 rounded-full`}
							onClick={showCartHandler}
						>
							<AiOutlineShoppingCart fontSize="30" />
							{cartBook.length > 0 ? (
								<div className="absolute animate-spin top-0 left-full px-1 rounded-full w-3 h-3 bg-red-300 text-[11px] text-white flex justify-center items-center">
									{cartBook.length}
								</div>
							) : (
								<></>
							)}
						</button>
						<Avatar />
					</div>
					{showCart ? <Cart handleShowCart={showCartHandler} /> : <></>}
				</div>
			)}
		</div>
	);
};

export default Header;
