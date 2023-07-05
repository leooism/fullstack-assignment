const TextStylize = (text: string) => {
	const modifiedString = [];
	const splittedText = text.split(" ");
	const middleIndex = Math.trunc(splittedText.length / 2);
	let myString = "";
	for (let i = 0; i < middleIndex; i++) {
		myString += splittedText[i] + " ";
	}
	modifiedString.push(
		<span key={1} className=" text-green-400">
			{myString}
		</span>
	);
	myString = "";
	const stylizedSpan = (
		<span className="text-blue-400 font-bold" key={2}>
			{splittedText[middleIndex]} {splittedText[middleIndex + 1]}{" "}
			{splittedText[middleIndex + 2]}{" "}
		</span>
	);
	modifiedString.push(stylizedSpan);
	for (let i = middleIndex + 3; i < splittedText.length; i++) {
		myString += splittedText[i] + " ";
	}
	modifiedString.push(
		<span className="text-yellow-500" key={3}>
			{myString}
		</span>
	);
	return modifiedString;
};

export default TextStylize;
