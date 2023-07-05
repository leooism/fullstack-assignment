import Button from "./UI/Button";
import { addToCart } from "../store/BookStore";
import { useDispatch } from "react-redux";
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
	const addItemToCart = () => {
		const item = { title, author, ISBN, price, availability, img };
		dispatch(addToCart(item));
	};
	return (
		<div className="min-w-[40%]  md:min-w-[20%] flex flex-col justify-center, items-center shadow-2xl rounded-s p-2 ">
			<img
				src={img}
				alt={title}
				className="w-[90%] h-[80%] object-cover rounded-s"
			/>
			<div className="flex flex-col">
				<p className="font-bold">{title}</p>
				<p className="text-yellow-950">{author}</p>
			</div>
			<div className="flex justify-between w-full">
				<p className="font-bold">Price: {price}</p>
				<p>{availability}</p>
			</div>
			<div className="w-full">
				<Button
					text="Add to Cart"
					style="w-full bg-[red] text-white"
					buttonClickHandler={addItemToCart}
				/>
			</div>
		</div>
	);
};
export default ShopBookCard;
