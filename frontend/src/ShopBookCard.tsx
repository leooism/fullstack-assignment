import Button from "./UI/Button";
import { addToCart, user } from "../store/BookStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export type shopBookCardPropsType = {
	title: string;
	author: string;
	ISBN: string;
	price: number;
	availability: string;
	img: string;
};
const ShopBookCard = ({
	title,
	author,
	ISBN,
	price,
	availability,
	img,
}: shopBookCardPropsType) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addItemToCart = () => {
		const item = { title, author, ISBN, price, availability, img };
		dispatch(addToCart(item));
	};
	const navigateToLoginPage = () => {
		navigate("/login");
	};
	const loggedUser = useSelector(user);
	const handleAddToCart = loggedUser.isLoggedIn
		? addItemToCart
		: navigateToLoginPage;
	return (
		<div className="min-w-[40%]  md:min-w-[20%] flex flex-col justify-center, items-center shadow-2xl rounded-s p-2 hover:border transition hover:border-black ">
			<div
				className="flex flex-col justify-center, items-center"
				onClick={() => {
					navigate(`/book/${ISBN}`);
				}}
			>
				<img
					src={img}
					alt={title}
					className="w-[90%] h-[80%] object-cover rounded-s"
				/>
				<div className="flex flex-col">
					<p className="font-bold">{title}</p>
					<p className="text-yellow-950">{author}</p>
				</div>
				<div className="flex justify-between w-[80%]">
					<p className="font-bold">Price: ${price}</p>
					<p>{availability}</p>
				</div>
			</div>
			<div className="">
				<Button
					text="Add to Cart"
					style="w-full bg-[red] text-white z-50 p-4"
					buttonClickHandler={handleAddToCart}
				/>
			</div>
		</div>
	);
};
export default ShopBookCard;
