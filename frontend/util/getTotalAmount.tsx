export default function calculateTotalAmount<T extends { totalPrice: number }>(
	arr: T[]
): number {
	return arr.reduce((acc: number, item: T) => {
		return acc + item.totalPrice;
	}, 0);
}
