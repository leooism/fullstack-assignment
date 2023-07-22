import React from "react";
import Avatar from "../UI/Avatar";
type ReviewItemType = {
	name: string;
	img?: string;
	message: string;
};
const ReviewItem = ({ name, img, message }: ReviewItemType) => {
	return (
		<div className="flex flex-col p-2 rounded-lg border border-b-zinc-300 ">
			<div className="flex gap-2">
				<Avatar />
				<h1 className="text-sm font-semibold text-gray-900">{name}</h1>
			</div>
			<p className="text-xs text-gray-500 ml-10 font-light">{message}</p>
		</div>
	);
};

export default ReviewItem;
