import Button from "../UI/Button";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
	return (
		<div className="flex flex-col bg-gray-800 h-80 w-full justify-center">
			<div className="flex justify-around">
				<div className="p-2 flex flex-col gap-2 items-center">
					<h1 className="text-xl text-white">Contact Us</h1>
					<form className="flex flex-col gap-2">
						<input
							placeholder="Enter your email address"
							className="text-sm p-2 border-none outline-none rounded-lg"
						></input>
						<Button
							text="Send"
							style="bg-red-900 text-white p-1"
							buttonClickHandler={() => {
								console.log("first");
							}}
						/>
					</form>
				</div>
				<div className="p-2 flex gap-2 flex-col">
					<h1 className="text-xl text-white">Connect WIth Us</h1>
					<div className="flex gap-2 text-white">
						<a
							href="https://www.facebook.com/profile.php?id=100084460092160"
							target="blank"
						>
							<BsFacebook fontSize="40" />
						</a>
						<a href="https://www.github.com/leooism" target="blank">
							<BsGithub fontSize="40" />
						</a>
						<a
							href="https://www.linkedin.com/in/bidhanbhandari/"
							target="blank"
						>
							<BsLinkedin fontSize="40" />
						</a>
					</div>
				</div>
			</div>
			<p className="text-white text-sm text-center w-full">
				All rights are reserved copyright with KitabiGyan
			</p>
		</div>
	);
};

export default Footer;
