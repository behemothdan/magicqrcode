/**
 * Calculates the horizontal placement of a QR code
 * with a given index.
 * @param qrIndex
 * @returns Placement of a QR code and text on a letter-sized PDF
 */
export function calculateHorizontalPlacement(qrIndex: number) {
	return 15 + ((qrIndex % 4) * 144)
}