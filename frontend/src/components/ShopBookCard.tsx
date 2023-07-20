import Button from "../UI/Button";
import { addToCart, user } from "../../store/BookStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
		try {
			const item = { title, author, ISBN, price, availability, img, id };
			await axios.post(
				"http://localhost:8000/cart/addItemToCart",
				{
					book_id: id,
					quantity: 1,
					totalPrice: price,
				},
				{
					withCredentials: true,
				}
			);

			dispatch(addToCart(item));
		} catch (error) {
			console.log(error);
		}
	};
	const navigateToLoginPage = () => {
		navigate("/login");
	};

	const loggedUser = useSelector(user);
	const handleAddToCart = loggedUser.email
		? addItemToCart
		: navigateToLoginPage;

	return (
		<div className="w-60 h-72 bg-white rounded-lg border-2 border-transparent flex gap-2 flex-col items-center   shadow-2xl rounded-s p-2 hover:border-2 transition hover:border-gray-400  ">
			<div
				className=" flex flex-col   cursor-pointer w-40 md:w-60 px-2 h-[80%] "
				onClick={() => {
					navigate(`/book/${ISBN}`);
				}}
			>
				<img
					src={img}
					alt={title}
					className="mx-auto w-full h-[70%]   object-cover rounded-s  "
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
