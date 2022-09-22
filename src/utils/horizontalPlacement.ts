export function calculateHorizontalPlacement(qrIndex: number) {
	return 15 + ((qrIndex % 4) * 144)
}