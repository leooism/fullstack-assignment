import { Outlet } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Button from "../UI/Button";

const AdminLayout = () => {
	return (
		<div className="bg-hero-pattern h-[100vh] g-no-repeat bg-cover  flex justify-center items-center">
			<div className="flex flex-col gap-2 mx-auto w-[90%] shadow-2xl rounded-lg bg-white p-2">
				<div className="flex flex-row items-center justify-between">
					<div className={"flex flex-col justify-center w-fit   px-4"}>
						<div className="flex justify-center">
							<img src={Logo} alt="" className={"w-10 h-10"} />
						</div>
						<h1 className="text-lg text-center font-serif font-extrabold">
							KitabiGyan
						</h1>
					</div>

					<div className="flex gap-2">
						<Button text="Settings " style="p-2 bg-pink-200" />
						<Button text="Log out " style="p-2 bg-red-400" />
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
