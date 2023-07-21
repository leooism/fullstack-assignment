import ReactDOM from "react-dom";
import Button from "../UI/Button";
const BackDrop = (props: { onshowModalHandler: () => void }) => {
	return (
		<div
			className="w-[100%] h-[100vh] bg-gray-300 fixed absolute top-0 left-0 z-40 opacity-60"
			onClick={() => {
				props.onshowModalHandler();
			}}
		></div>
	);
};

const Modal = (props: { onshowModalHandler: () => void }) => {
	const filterSubmitHandler = (e: React.HTMLFormElement) => {
		e.preventDefault();
	};
	console.log(props);
	return (
		<>
			{ReactDOM.createPortal(
				<BackDrop onshowModalHandler={props.onshowModalHandler} />,
				document.getElementById("backdrop") as HTMLDivElement
			)}

			{ReactDOM.createPortal(
				<div className="absolute top-[50vh]  left-[50vw] z-50 -translate-x-1/2 -translate-y-1/2  ">
					<div className="bg-white shadow-xl rounded-xl w-96 flex-col flex justify-center p-3">
						<h1 className="text-gray-900 font-semibold">Advance Filters</h1>
						<form
							action="post"
							className="flex flex-col  justify-center w-full "
							onSubmit={filterSubmitHandler}
						>
							<div className="flex justify-around">
								<div className="flex flex-col">
									<label
										htmlFor="email"
										className="text-gray-900 mb-2 font-semibold "
									>
										Genre
									</label>
									<input
										type="email"
										name="email"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
										id="email"
									/>
								</div>
								<div className=" flex flex-col">
									<label
										htmlFor="email"
										className="text-gray-900 mb-2 font-semibold "
									>
										Author
									</label>
									<input
										type="email"
										name="email"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
										id="email"
									/>
								</div>
							</div>
							<div className="flex  flex-col">
								<p className="text-gray-900 mb-2 font-semibold text-center ">
									Price
								</p>
								<div className="flex flex-row justify-around">
									<input
										type="number"
										name="email"
										placeholder="Min Price"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
									/>
									<input
										type="number"
										name="email"
										placeholder="Min Price"
										className="w-32 border-2 rounded-lg p-2 border-gray-400 outline-none text-gray-400 font-semibold "
									/>
								</div>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-gray-900 font-semibold">Sort By</p>
								<select
									name="SortBy"
									id="sb"
									className="border-2 p-2 outline-none border-x-gray-400 rounded-lg w-32 mb-2"
								>
									<option value="price">Price</option>
									<option value="ratings">Ratings</option>
								</select>
							</div>

							<div className="flex ">
								<Button
									text="Cancel"
									style="p-2  w-32 mx-auto bg-red-400 shadow-lg text-white uppercase hover:shadow-3xl hover:scale-110 transition"
									buttonClickHandler={props.onshowModalHandler}
								/>
								<Button
									text="Apply"
									style="p-2  w-32 mx-auto bg-blue-400 shadow-lg text-white uppercase hover:shadow-3xl hover:scale-110 transition"
								/>
							</div>
						</form>{" "}
					</div>
					,
				</div>,
				document.getElementById("overlay")
			)}
		</>
	);
};

export default Modal;
