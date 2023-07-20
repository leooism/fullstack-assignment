import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../../store/BookStore";

const Protected = (props: PropsWithChildren) => {
	const userDetail = useSelector(user);
	const navigate = useNavigate();
	useEffect(() => {
		if (userDetail.email === undefined) {
			navigate("/login");
		}
		return;
	}, [userDetail.email, navigate]);
	return <>{props.children}</>;
};

export default Protected;
