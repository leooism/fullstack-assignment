import Button from "../UI/Button";
import { user, addItemsToCartAsync } from "../../store/BookStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export type shopBookCardPropsType = {
	id: string;
	title: string;
	author?: string;
	ISBN: string;
	price: number;
	availability: string;
	img: string;
};
const ShopBookCard = ({
	id,
	title,
	author,
	ISBN,
	price,
	availability,
	img,
}: shopBookCardPropsType) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addItemToCart = async () => {
		dispatch(
			addItemsToCartAsync(title, author, ISBN, price, availability, img, id)
		);
	};
	const navigateToLoginPage = () => {
		navigate("/login");
	};

	const loggedUser = useSelector(user);
	const handleAddToCart = loggedUser.email
		? addItemToCart
		: navigateToLoginPage;

	return (
		<div className="w-60 md:w-72   bg-white rounded-lg border-2 border-transparent flex  flex-col items-center  justify-between shadow-2xl rounded-s p-2 hover:border-2 transition hover:border-gray-400  ">
			<div
				className=" flex flex-col   cursor-pointer w-40 md:w-60 px-2 "
				onClick={() => {
					navigate(`/book/${id}`);
				}}
			>
				<img
					src={img}
					alt={title}
					className="mx-auto w-full h-32 md:h-40   object-cover rounded-s  "
				/>
				<div className="flex flex-col">
					<p className="font-bold  text-xs md:text-sm ">{title}</p>
					<p className="text-yellow-950 text-xs md:text-sm">{author}</p>
				</div>
				<div className="flex justify-between w-[20%] text-xs md:text-sm">
					<p className="text-gray-900">Price: ${price}</p>
					<p>{availability}</p>
				</div>
			</div>
			<Button
				text="Add to Cart"
				style="w-30 bg-[red] text-white z-50 md:p-2 text-xs md:text-sm p-1"
				buttonClickHandler={handleAddToCart}
			/>
		</div>
	);
};
export default ShopBookCard;
