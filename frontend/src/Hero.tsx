import React from "react";
import BookSlider from "./BookSlider";

const Hero = () => {
	return (
		<div className="flex justify-center">
			<div className="w-[90%] h-[60vh] shadow-2xl rounded-lg">
				<BookSlider />
			</div>
		</div>
	);
};

export default Hero;
