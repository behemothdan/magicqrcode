import { validateUrls } from './validateUrls';
import { qrrequest } from "../types/qrrequest";

/**
 * This cleans the array of decklists since .filter
 * works without the indexes getting messed up.
 * But using this function before we do QR placement
 * we can guarantee there are no invalid URLs in the array.
 * @param decklistArray
 * @returns Cleaned array of deck lists
 */
export function cleanDecklistArray(decklistArray: any[]) {
	return decklistArray.filter((deckInfo: qrrequest) => validateUrls(deckInfo.url) !== null);
}