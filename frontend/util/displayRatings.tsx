import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";

export default function displayRatings(ratingNumber) {
	const stars = [];
	const filledStars = Math.floor(ratingNumber);
	for (let i = 0; i < filledStars; i++) {
		stars.push(<AiTwotoneStar />);
	}
	if (ratingNumber - filledStars > 0) {
		stars.push(<BiSolidStarHalf />);
	}
	return stars;
}
