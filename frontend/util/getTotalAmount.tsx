export default function calculateTotalAmount<T>(arr: T[]): number {
	return arr.reduce((acc: number, item: T) => acc + item.totalPrice, 0);
}
