import Button from "../UI/Button";
import CartListItem from "./CartListItem";
import { selectCartBook } from "../../store/BookStore";
import { useSelector } from "react-redux";
import type { CartBookType } from "../../store/BookStore";
import calculateTotalAmount from "../../util/getTotalAmount";
import { useNavigate } from "react-router-dom";

type CartPropsType = {
	handleShowCart: () => void;
};

const Cart = (props: CartPropsType) => {
	const cartBook = useSelector(selectCartBook);
	console.log(cartBook);
	const navigate = useNavigate();
	return (
		<div className="absolute w-72 flex bg-zinc-50 left-[-260%] top-10 mt-4 flex-col justify-center gap-2 shadow-lg p-2 rounded-lg ">
			<div className="flex flex-col gap-2 max-h-40 overflow-y-scroll scrollbar-hide ">
				{cartBook.length > 0 ? (
					<>
						{cartBook.map((bk, i) => (
							<CartListItem
								id={bk.id}
								bookTitle={bk.title}
								img={bk.img}
								quantity={bk.quantity}
								ISBN={bk.ISBN}
								price={bk.price}
								totalPrice={bk.totalPrice}
								key={i}
							/>
						))}
						<h1>Total: ${calculateTotalAmount<CartBookType>(cartBook)}</h1>
					</>
				) : (
					<h1 className="text-sm">
						You dont have an item in cart. Mind if you want to add some books in
						your reading
					</h1>
				)}
			</div>
			<div className="flex gap-2 justify-center">
				<Button
					text="Cancel"
					buttonClickHandler={props.handleShowCart}
					style="bg-[#46EEB2] p-1 text-white text-sm"
				/>
				<Button
					text="Checkout"
					buttonClickHandler={() => {
						navigate("/checkout");
					}}
					style="p-1 bg-[#F8CD0F] text-white text-sm"
					disabled={cartBook.length === 0 ? true : false}
				/>
			</div>
		</div>
	);
};

export default Cart;
