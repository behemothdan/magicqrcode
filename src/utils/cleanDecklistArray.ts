import { validateUrls } from './validateUrls';
import { qrrequest } from "../types/qrrequest";

/**
 * This cleans the array of decklists since .filter
 * works without the indexes getting messed up.
 * But using this function before we do QR placement
 * we can guarantee there are no invalid URLs in the array.
 * @param decklistArray
 * @returns Array of deck lists after removing entries with invalid URLs
 */
export function cleanDecklistArray(decklistArray: any[]) {
	return decklistArray.filter((deckInfo: qrrequest) => validateUrls(deckInfo.url) !== null);
}