/**
 * Calculates the vertical placement of a QR code
 * and the optional label for a commander if provided.
 * @param qrIndex
 * @param isText
 * @returns Placement of a QR code and text on a letter-sized PDF
 */
export function calculateVerticalPlacement(qrIndex: number, isText?: boolean) {
	return ((isText? 150 : 15) + (Math.floor((qrIndex % 16)/4) * 185))
}