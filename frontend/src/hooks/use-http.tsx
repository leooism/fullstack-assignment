import React, { useState } from "react";
import axios from "axios";

const useHttp = (url: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setIsError] = useState(false);

	const fetchData = React.useCallback(
		async (applyData: (data: any) => void) => {
			try {
				setIsLoading(true);
				const response = await axios.get(url);
				const data = await response;
				applyData(data.data.books);
				setIsLoading(false);
				return data;
			} catch (er: any) {
				setIsLoading(false);
				setIsError(er);
			}
		},
		[]
	);
	return {
		isLoading,
		error,
		fetchData,
	};
};

export default useHttp;
