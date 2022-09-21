export function calculateVerticalPlacement(qrIndex: number, isText?: boolean) {
	return ((isText? 150 : 15) + (Math.floor(qrIndex/4) * 160))
}