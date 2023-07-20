import React from "react";

type CardTypeProps = {
	style: React.HTMLProps<HTMLElement>["className"];
	childern?: JSX.Element;
};
const Card = (props: CardTypeProps) => {
	return (
		<div className={`shadow-lg p-2 rounded-lg ${props.style}`}>
			{props.childern}
		</div>
	);
};

export default Card;
