export function calculateVerticalPlacement(qrIndex: number, isText?: boolean) {
	return ((isText? 150 : 15) + (Math.floor((qrIndex % 16)/4) * 185))
}