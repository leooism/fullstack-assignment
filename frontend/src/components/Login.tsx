import { useEffect, useState } from "react";
import Button from "../UI/Button.tsx";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../store/BookStore.tsx";
import axios from "axios";

import { BiLogoFacebookCircle, BiErrorCircle } from "react-icons/bi";

import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "./signup.tsx";
type errorType = {
	message: string;
};
const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<errorType[]>([]);

	const [loading, setIsLoading] = useState(false);
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		return;
		if (email.trim().length <= 0 && password.trim().length <= 0) return;
		handleLogin();
	};
	const [screen, setScreen] = useState("login");
	const switchScreenHandler = () => {
		setScreen((prev) => {
			return prev === "login" ? "signup" : "login";
		});
	};

	useEffect(() => {
		const unSubscribeTimeout = setTimeout(() => {
			if (error.length > 0 && Array.isArray(error)) setError([]);
		}, 4000);
		return () => clearTimeout(unSubscribeTimeout);
	}, [error, setError]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			if (screen === "login") {
				setIsLoading(true);
				axios
					.post(
						"http://localhost:8000/user/login",
						{
							email: email,
							password: password,
						},
						{
							withCredentials: true,
						}
					)
					.then(function (response) {
						const data = {
							id: response.data.data.id,
							username: response.data.data["f_name"],
							profileImage: response.data.data.profileImage,
							email: response.data.data.email,
							cart_id: response.data.data.cart_id,
							role: response.data.data.role,
						};
						dispatch(loginUser(data));
						setIsLoading(false);
						navigate("/");
					})
					.catch(function (error) {
						setError((er) => [...er, { message: error.response.data.message }]);
						setIsLoading(false);
					});
			}
			if (screen === "signup") {
				setIsLoading(true);
				// const userCredentials = await createUserWithEmailAndPassword(
				// 	auth,
				// 	email,
				// 	password
				// );
				// const user = await userCredentials.user;
				// dispatch(signupUser(user));
				// setIsLoading(false);
			}
		} catch (er: any) {
			if ("code" in er)
				setError((p) => {
					return [...p, { code: er.code, id: er.code.slice(" ")[0] }];
				});
			setIsLoading(false);
		}
	};
	console.log(error);

	const renderItem =
		screen === "login" ? (
			<>
				{loading ? <p className="animate-spin  text-3xl">🔃</p> : <></>}
				<div className="mx-auto bg-white shadow-2xl  animate-pulse  rounded-md flex  p-4 items-center justify-between w-[50%] md:w-[30%] text-gray-900">
					<form
						action="post"
						className="flex flex-col  justify-center w-full "
						onSubmit={handleFormSubmit}
					>
						<h1 className="text-center text-2xl text-gray-900 ">Login</h1>
						<div className=" flex flex-col">
							<label
								htmlFor="email"
								className="text-gray-900 mb-2 font-semibold "
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								className="border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className=" flex flex-col">
							<label
								htmlFor="password"
								className="text-gray-900 my-2 font-semibold"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								className="p-2 border-2 border-gray-400 rounded-lg font-semibold outline-none "
								placeholder="Enter your password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex justify-between mt-2 flex-col gap-2">
							<a href="#" className="text-gray-600 text-sm">
								Forgot Password?
							</a>
							<Button
								text="log in"
								style="p-2  w-32 mx-auto bg-blue-400 shadow-lg text-white uppercase hover:shadow-3xl hover:scale-110 transition"
							/>
						</div>
						<div className="mt-2 flex justify-center  gap-2  items-center ">
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
								className="text-white  p-2 rounded-full text-sm flex items-center gap-5 border-2 border-transparent hover:border-gray-400 "
							>
								<span>
									<FcGoogle fontSize="20" />
								</span>
							</a>
						</div>
						<p
							className="text-center text-gray-700 text-sm mt-4"
							onClick={switchScreenHandler}
						>
							Don't have an account? <a href="#">Sign up</a>
						</p>
					</form>
				</div>
			</>
		) : (
			<Signup />
		);

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
			{renderItem}
		</>
	);
};

export default LoginForm;
