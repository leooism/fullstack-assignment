import ShopBook from "./ShopBook";

import { useSelector, useDispatch } from "react-redux";
import { selectBook, filterItem } from "../../store/BookStore";
import Authors from "./Authors.tsx";
import PopularBooks from "./PopularBooks.tsx";

import CategoryBoxItem from "./CategoryBoxItem";

const Shopping = () => {
	const dispatch = useDispatch();
	const filterItemByHandler = (filterBy: string) => {
		dispatch(filterItem(filterBy));
	};
	return (
		<div className="flex flex-col  justify-center gap-10">
			<div className="flex justify-center  flex-col gap-2 ">
				<h1 className="text-2xl  text-gray-900">Categories</h1>
				<div className="flex flex-row gap-5 flex-wrap justify-center">
					<CategoryBoxItem
						category="fiction"
						filterItemByHandler={filterItemByHandler}
						img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
					<CategoryBoxItem
						category="real life"
						filterItemByHandler={filterItemByHandler}
						img="https://images.pexels.com/photos/7938716/pexels-photo-7938716.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
					<CategoryBoxItem
						category="autobiography"
						filterItemByHandler={filterItemByHandler}
						img="https://media.istockphoto.com/id/481127321/photo/autobiography.jpg?b=1&s=612x612&w=0&k=20&c=vMyXuq4FrujWsEp_MLTDyw-GQbpSTSUAN4WCAxzn6SA="
					/>
					<CategoryBoxItem
						category="Romantic"
						filterItemByHandler={filterItemByHandler}
						img="https://images.pexels.com/photos/1314584/pexels-photo-1314584.jpeg?auto=compress&cs=tinysrgb&w=400"
					/>
				</div>
			</div>
			<ShopBook />
			<Authors />
			<PopularBooks />
		</div>
	);
};

export default Shopping;
