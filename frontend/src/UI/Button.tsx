type ButtonPropsType = {
	text: string;
	buttonClickHandler?: () => void;
	style: React.HTMLProps<HTMLElement>["className"];
	disabled?: boolean;
};

const Button = (props: ButtonPropsType) => {
	return (
		<button
			className={` border rounded-lg ${props.style} ${
				props.disabled ? "cursor-not-allowed" : ""
			}`}
			onClick={props.buttonClickHandler}
			disabled={props.disabled}
		>
			{props.text}
		</button>
	);
};

export default Button;
