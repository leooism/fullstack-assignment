import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { decrementItem, incrementItem } from "../../store/BookStore";

import { TiDelete } from "react-icons/ti";
type CartListItemPropsType = {
	img: string;
	bookTitle: string;
	price: number;
	ISBN: string;
	quantity: number;
	totalPrice: number;
};

const CartListItem = (props: CartListItemPropsType) => {
	const dispatch = useDispatch();
	const incrementItemQuantity = () => {
		dispatch(incrementItem(props.ISBN));
	};
	const decrementItemQuantity = () => {
		dispatch(decrementItem(props.ISBN));
	};
	return (
		<div className="flex flex-col justify-between gap-2 border p-2 rounded-lg">
			<div className="flex justify-between items-center gap-2">
				<img src={props.img} className="w-10 h-10 shadow-lg rounded-lg " />
				<p className="text-[10px] w-3/4 flex flex-col ">
					<span> {props.bookTitle}</span>
					<span className="font-bold">per pic ${props.price}</span>
				</p>
				<div className="flex">
					<TiDelete fontSize="20" />
				</div>
			</div>

			<div className="flex font-bold text-sm justify-between w-full">
				<div>
					<span>{props.quantity}</span> Items
				</div>
				<div className="flex gap-2 items-center">
					<button
						className="w-4 h-4 shadow-lg text-center rounded-full hover:scale-125 flex items-center "
						onClick={decrementItemQuantity}
					>
						<AiOutlineMinus />
					</button>
					<button
						className="w-4 h-4 shadow-lg text-center rounded-full hover:scale-125 flex items-center"
						onClick={incrementItemQuantity}
					>
						<AiOutlinePlus />
					</button>
				</div>
			</div>
			<div>
				<h1 className="font-bold text-sm">Price: ${props.totalPrice} </h1>
			</div>
		</div>
	);
};

export default CartListItem;
