import React, { useEffect, useState } from "react";
import { signupUser } from "../../store/BookStore.tsx";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Button from "../UI/Button.tsx";
type errorType = {
	id: string;
	code: string;
};

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log(e);
	};
	const [error, setError] = useState<errorType[]>([]);

	useEffect(() => {
		const unSubscribeTimeout = setTimeout(() => {
			if (error.length > 0 && Array.isArray(error)) setError([]);
		}, 4000);
		return () => clearTimeout(unSubscribeTimeout);
	}, [error, setError]);
	return (
		<>
			{error.length > 0 &&
				error.map((er) => (
					<div className="absolute left-[80%] top-20 bg-red-600  flex items-center gap-2 px-2 py-1 rounded-lg">
						<BiErrorCircle className="text-white text-xl" />
						<h1 className="text-white text-sm">{er.message.toUpperCase()}</h1>
						{/* <AiFillCloseCircle
							className="text-white text-xl"
							id={Math.random()}
							onClick={function () {
								const sliceArrayError = error
									.slice()
									.filter((el) => el. !== er.id);
								setError(sliceArrayError);
							}}
						/> */}
					</div>
				))}
			<div className="mx-auto bg-white shadow-lg  rounded-md flex  p-4 items-center justify-between w-[70%] md:w-[33%]">
				<form
					action="post"
					className="flex flex-col gap-2  justify-center w-full"
					onSubmit={handleSubmit}
				>
					<h1 className="text-center text-2xl text-gray-900 ">Sign up</h1>
					<div className=" flex flex-row  gap-2">
						<div className="flex flex-col w-40">
							<label
								htmlFor="email"
								className="text-gray-900 mb-2 font-semibold"
							>
								First Name
							</label>
							<input
								type="text"
								name="email"
								className="border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-500 font-semibold placeholder-slate-300 "
								id="email"
								value={firstName}
								placeholder="John"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="flex flex-col w-40">
							<label
								htmlFor="email"
								className="text-gray-900 font-semibold mb-2"
							>
								Last Name
							</label>
							<input
								type="text"
								name="email"
								className="border-2 rounded-lg p-2 border-gray-500 outline-none text-gray-400 font-semibold "
								id="lname"
								placeholder="Doe"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className=" flex flex-col">
						<label htmlFor="email" className="text-gray-900 font-semibold mb-2">
							Email
						</label>
						<input
							type="email"
							name="email"
							className="border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-500 font-semibold "
							id="email"
							placeholder="johndoe@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className=" flex flex-col">
						<div className="flex flex-col">
							<label
								htmlFor="password"
								className="text-gray-900 font-semibold mb-2"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								className="border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
								id="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="password"
								className="text-gray-900 font-semibold mb-2"
							>
								Confirm your password
							</label>
							<input
								type="password"
								name="password"
								className="p-2 border"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex justify-between  flex-col gap-2">
						<a href="#" className="text-gray-600 text-sm">
							Forgot Password?
						</a>
						<Button text="Sign up" style="p-2 bg-yellow-200 text-white" />
					</div>
					<div className="mt-1 flex justify-center  gap-2  items-center ">
						<a
							href="#"
							className="text-white text-sm bg-blue-600 p-2 rounded-full flex items-center gap-5"
						>
							<span>
								<BiLogoFacebookCircle fontSize="20" />
							</span>
						</a>
						<a
							href="#"
							className="text-white border-2  p-2 rounded-full text-sm flex items-center border-transparent hover:border-gray-700 gap-5"
						>
							<span>
								<FcGoogle fontSize="20" />
							</span>
						</a>
					</div>
					<p className="text-center text-gray-700 text-sm ">
						Already have an account? <a href="#">Login In</a>
					</p>
				</form>
			</div>
		</>
	);
};

export default Signup;
