import Button from "../UI/Button";
import { addToCart, user } from "../../store/BookStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export type shopBookCardPropsType = {
	title: string;
	author?: string;
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
	const handleAddToCart = loggedUser.email
		? addItemToCart
		: navigateToLoginPage;

	return (
		<div className="w-60 bg-white rounded-lg border-2 border-transparent flex gap-2 flex-col items-center j  shadow-2xl rounded-s p-2 hover:border-2 transition hover:border-gray-400  ">
			<div
				className=" flex flex-col justify-evenly  cursor-pointer w-40 md:w-60 px-2 "
				onClick={() => {
					navigate(`/book/${ISBN}`);
				}}
			>
				<img
					src={img}
					alt={title}
					className="mx-auto w-full  object-cover rounded-s "
				/>
				<div className="flex flex-col">
					<p className="font-bold  ">{title}</p>
					<p className="text-yellow-950">{author}</p>
				</div>
				<div className="flex justify-between w-[20%]">
					<p className="text-gray-900">Price: ${price}</p>
					<p>{availability}</p>
				</div>
			</div>
			<div className="">
				<Button
					text="Add to Cart"
					style="w-full bg-[red] text-white z-50 p-2"
					buttonClickHandler={handleAddToCart}
				/>
			</div>
		</div>
	);
};
export default ShopBookCard;
