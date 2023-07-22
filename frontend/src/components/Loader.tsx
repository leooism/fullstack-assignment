import { Outlet, Link } from "react-router-dom";
import axios from "axios";
let queryData = "";
export function getQueryData(query: string) {
	queryData = query;
}
export async function loader() {
	const responseData = await axios.get(
		`http://localhost:8000/books?title=${queryData}`
	);

	const booksData = await responseData.data.books;
	console.log(responseData);
	return { booksData };
}
