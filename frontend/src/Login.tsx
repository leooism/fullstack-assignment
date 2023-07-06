import { useState } from "react";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		setLoading(true);
		if (email.trim().length <= 0 && password.trim().length <= 0) return;
		navigate("/");
	};

	return (
		<div className=" w-full h-[100vh] bg-hero-pattern bg-no-repeat bg-cover">
			<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white shadow-lg  rounded-md flex  p-4 items-center justify-between w-[50%]">
				<form
					action="post"
					className="flex flex-col  justify-center w-full"
					onSubmit={handleSubmit}
				>
					<h1 className="text-center text-3xl font-semibold mb-4">Login</h1>
					<div className="mb-4 flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							className="border p-2"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-4 flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							className="p-2 border"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex justify-between mb-4 flex-col gap-2">
						<a href="#" className="text-gray-600 text-sm">
							Forgot Password?
						</a>
						<Button text="Log in" style="p-2 bg-yellow-800 text-white" />
					</div>
					<div className="flex justify-center flex-col gap-2  items-center ">
						<a
							href="#"
							className="text-white text-sm bg-blue-600 p-2 rounded-lg"
						>
							Login with Facebook
						</a>
						<a
							href="#"
							className="text-white bg-red-500 p-2 rounded-lg text-sm"
						>
							Login with Google
						</a>
					</div>
					<p className="text-center text-gray-700 text-sm mt-4">
						Don't have an account? <a href="#">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
