import Logo from "../assets/logo.svg";
import Button from "../UI/Button";
import { FaSearchengin } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";

import Avatar from "../UI/Avatar";
import { SetStateAction, useState } from "react";
import Cart from "./Cart";
import { selectCartBook, addItemToBookStore } from "../../store/BookStore";
import { useNavigate } from "react-router-dom";
type HeaderPropsType = {
	loggedInStatus: boolean;
	onshowModalHandler: () => void;
};
const Header = ({ loggedInStatus, onshowModalHandler }: HeaderPropsType) => {
	const [showCart, setShowCart] = useState(false);
	const showCartHandler = (): void => setShowCart((prev) => !prev);
	const cartBook = useSelector(selectCartBook);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [inputValue, setInputValue] = useState("");
	const inputValueChangeHandler = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		setInputValue(e.target.value);
	};
	const { fetchData } = useHttp("http://localhost:8000/books");
	const searchInputHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue.trim() === "") return;
		const data = await fetchData(
			`http://localhost:8000/books?title=${inputValue}`
		);
		if (data) dispatch(addItemToBookStore(data.data.allBooks));
		setInputValue("");
	};
	const resetStoreBook = async () =>
		await fetchData((data) => dispatch(addItemToBookStore(data.data.allBooks)));

	return (
		<div className="flex w-full items-center  justify-between  gap-2 sticky top-0 left-0  z-30 bg-white  border  shadow-2xl">
			<div
				className={"flex flex-col justify-center w-fit   px-4"}
				onClick={() => {
					navigate("/");
				}}
			>
				<div className="flex justify-center">
					<img src={Logo} alt="" className={"w-10 h-10"} />
				</div>
				<h1 className="text-lg text-center font-serif font-extrabold">
					KitabiGyan
				</h1>
			</div>
			<div className=" flex gap-2">
				<form
					className=" flex  gap-2 flex-row  items-center border p-2  rounded-lg justify-between"
					onSubmit={searchInputHandler}
				>
					<input
						value={inputValue}
						onChange={inputValueChangeHandler}
						type="text"
						placeholder="Search Books by title and author"
						className=" text-sm border-0 outline-none "
					/>
					<div className="flex justify-center items-center flex-1 hover:scale-125 hover:transition-all cursor-pointer">
						<FaSearchengin fontSize="20" />
					</div>
				</form>
				<div className="flex items-center text-2xl">
					<BiFilterAlt
						onClick={() => {
							onshowModalHandler();
						}}
					/>
				</div>
			</div>
			{!loggedInStatus ? (
				<div className="flex gap-2">
					<Button
						text="Log In"
						style="p-2 text-sm hover:bg-gradient-to-l from-red-500 to-blue-500 hover:text-white "
						buttonClickHandler={() => {
							navigate("/login");
						}}
					/>

					<Button
						text="Sign Up"
						style="p-2 text-sm bg-gradient-to-r from-green-500 to-yellow-500 text-white"
						buttonClickHandler={() => {
							navigate("/signup");
						}}
					/>
				</div>
			) : (
				<div className="flex  relative">
					<div className=" flex justify-between items-center">
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
