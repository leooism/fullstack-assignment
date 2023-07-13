import Button from "../UI/Button";

const Admin = () => (
	<div className="flex justify-between  flex-wrap gap-10">
		<div className="flex gap-2 flex-col rounded-lg shadow-inner">
			<h1 className="font-semibold text-2xl">Books</h1>
			<div className="flex justify-between gap-2 items-center border-2 p-1 rounded-lg">
				<div className="w-10 h-10 rounded-sm bg-red-200"></div>
				<div className="flex flex-col">
					<p className="text-sm font-semibold text-gray-900">
						How to win friends and influence people
					</p>
					<p className="font-semibold text-gray-400 text-sm">Dale Cargne</p>
				</div>
			</div>
		</div>
		<div className="flex  gap-2 flex-col rounded-lg sjadpw=2xl">
			<div className="flex justify-center items-center rounded-lg  ">
				<img
					src="https://th.bing.com/th?id=ORMS.f06554b88ff2c0047ce7c1d6968f7d41&pid=Wdp&w=300&h=304&qlt=90&c=1&rs=1&dpr=1.149999976158142&p=0"
					alt="test"
					className="w-40 h-40 rounded-lg"
				/>
			</div>
			<form
				action=""
				className="gap-2 flex flex-col justify-center items-center"
			>
				<div className="flex gap-2 items-center w-full justify-between">
					<div className="flex flex-col">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Title
						</label>
						<input type="text" className="border p-1" />
					</div>
					<div className="flex flex-col ">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							price
						</label>
						<input type="text" className="border p-1" />
					</div>
				</div>
				<div className="flex gap-2 items-center w-full justify-between">
					<div className="flex flex-col">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Author
						</label>
						<input type="text" className="border p-1" />
					</div>
					<div className="flex flex-col ">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Availability
						</label>
						<input type="text" className="border p-1" />
					</div>
				</div>
				<div className="flex gap-2 items-center w-full justify-between">
					<div className="flex flex-col">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Genre
						</label>
						<input type="text" className="border p-1" />
					</div>
					<div className="flex flex-col ">
						<label
							htmlFor=""
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Quantity
						</label>
						<input type="text" className="border p-1" />
					</div>
				</div>
				<Button
					text="Save"
					style="mt-2 w-[90%] p-2 bg-gray-200 text-gray-900 font-medium "
				/>
			</form>
		</div>
	</div>
);

export default Admin;
