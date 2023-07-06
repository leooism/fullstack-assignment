import ReactDOM from "react-dom";
import LoginForm from "../Login";
const BackDrop = () => {
	return (
		<div className="w-[100vh] h-[100vh] bg-black absolute top-0 left-0 z-50"></div>
	);
};

const Model = () => {
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop />,
				document.getElementById("backdrop") as HTMLDivElement
			)}
			{ReactDOM.createPortal(
				<LoginForm />,
				document.getElementById("overlay") as HTMLDivElement
			)}
		</>
	);
};

export default Model;
