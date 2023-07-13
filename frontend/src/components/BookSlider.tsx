import { useCallback, useEffect, useState } from "react";

import TextStylize from "../../util/TextStylize";

import carousel from "./CarouselData";
const BookSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlideHandler = useCallback(() => {
		if (currentSlide >= carousel.length - 1) return setCurrentSlide(0);
		setCurrentSlide((prevSlide) => prevSlide + 1);
	}, [setCurrentSlide, currentSlide]);

	useEffect(() => {
		const slideDOM = document.querySelectorAll<HTMLDivElement>(".slide");
		slideDOM.forEach(function (slide, i) {
			slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
		});
	}, [currentSlide]);
	useEffect(() => {
		const unSubscribeTimeout = setInterval(() => {
			nextSlideHandler();
		}, 4000);

		return () => clearInterval(unSubscribeTimeout);
	}, [nextSlideHandler]);

	return (
		<div
			className={
				"slides relative w-full h-full   overflow-y-hidden overflow-x-hidden "
			}
		>
			{carousel.map((slide) => (
				<div
					className={`${"slide p-10 absolute h-full items-center flex gap-2  w-full  transition ease-linear  duration-300 "}`}
					key={slide.id + 2}
				>
					<div className="w-80">
						<h1 className="text-[25px]">
							{TextStylize(slide.benefit).map((item) => item)}
						</h1>
					</div>
					<div className=" w-full h-full">
						<img src={slide.img} alt="img" className="w-full h-full" />
					</div>
				</div>
			))}
		</div>
	);
};

export default BookSlider;
