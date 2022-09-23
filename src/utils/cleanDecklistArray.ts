import { validateUrls } from './validateUrls';
import { qrrequest } from "../types/qrrequest";

/**
 * This cleans the array of decklists since .splice
 * works in place rather than creating a new array.
 * But using this function before we do QR placement
 * we can guarantee there are no invalid URLs in the array.*
 * @param decklistArray
 * @returns Cleaned array of deck lists
 */
export function cleanDecklistArray(decklistArray: any) {
	(decklistArray.map(async (deckInfo: qrrequest, index: number, decklistArrayCopy: []) => {
		if (validateUrls(deckInfo.url) === null) {
			decklistArrayCopy.splice(index,1);
		}
	}))
	return decklistArray;
}