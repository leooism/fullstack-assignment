import React from "react";

type CardTypeProps = {
	className: React.HTMLProps<HTMLElement>["className"];
	childern?: JSX.Element;
};
const Card = (props: CardTypeProps) => {
	return (
		<div className={`shadow-lg p-2 rounded-lg ${props.className}`}>
			{props.childern}
		</div>
	);
};

export default Card;
