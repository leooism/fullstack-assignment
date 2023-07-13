import { useMemo, useEffect } from "react";
import Hero from "./components/Hero";
import Shopping from "./components/Shopping";
import { addItemToBookStore } from "../store/BookStore";
import { useDispatch } from "react-redux";
import useHttp from "./hooks/use-http";
function App() {
	const { isLoading, error, fetchData } = useHttp(
		"http://localhost:8000/books"
	);
	const dispatch = useDispatch();
	useEffect(() => {
		const applyData = (data: any) => dispatch(addItemToBookStore(data));
		fetchData(applyData);
	}, [dispatch, fetchData]);

	return (
		<div className="flex  flex-col gap-10  w-11/12 mx-auto">
			{isLoading ? <p>Loading</p> : <Shopping />}
			{error ? <p>error</p> : <></>}
			<Hero />
		</div>
	);
}

export default App;
