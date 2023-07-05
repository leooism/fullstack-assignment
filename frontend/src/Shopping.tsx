import ShopBook from "./ShopBook";

import { useSelector } from "react-redux";
import { selectBook } from "../store/BookStore";

const CategoryBoxItem = ({
	category,
	img,
}: {
	category: string;
	img?: string;
}) => (
	<div className="flex flex-col justify-center items-center ">
		<img
			className="w-32 h-32 rounded-full  hover:scale-110 transition hover:border"
			src={img}
			alt={category}
		/>
		<p className="font-bold">{category}</p>
	</div>
);

const Shopping = () => {
	const books = useSelector(selectBook);

	return (
		<div className="mx-auto flex flex-col  justify-center gap-10  w-[90%]">
			<div className="flex justify-center  flex-col gap-2 max-w-[100%]">
				<h1 className="text-2xl font-bold">Search By Category</h1>
				<div className="flex flex-row gap-5 flex-wrap justify-center">
					<CategoryBoxItem
						category="fiction"
						img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
					<CategoryBoxItem
						category="Real Life"
						img="https://images.pexels.com/photos/7938716/pexels-photo-7938716.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
					<CategoryBoxItem
						category="Auto-Biography"
						img="https://media.istockphoto.com/id/481127321/photo/autobiography.jpg?b=1&s=612x612&w=0&k=20&c=vMyXuq4FrujWsEp_MLTDyw-GQbpSTSUAN4WCAxzn6SA="
					/>
					<CategoryBoxItem
						category="Romantic"
						img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
				</div>
			</div>
			{Object.entries(books).map((book) => {
				return <ShopBook book={book} />;
			})}
		</div>
	);
};

export default Shopping;
