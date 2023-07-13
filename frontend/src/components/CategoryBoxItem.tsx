import React from "react";

const CategoryBoxItem = ({
	category,
	filterItemByHandler,
	img,
}: {
	category: string;
	filterItemByHandler: (filterBy: string) => void;
	img?: string;
}) => (
	<div
		className="flex flex-col justify-center items-center "
		onClick={() => {
			filterItemByHandler(category);
		}}
	>
		<img
			className="w-32 h-32 rounded-full  hover:scale-110 transition hover:border"
			src={img}
			alt={category}
		/>
		<p className="font-bold">{category.toUpperCase()}</p>
	</div>
);

export default CategoryBoxItem;
