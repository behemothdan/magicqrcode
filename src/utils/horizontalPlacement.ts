export function calculateHorizontalPlacement(qrIndex: number) {
	return 10 + ((qrIndex % 4) * 144)
}