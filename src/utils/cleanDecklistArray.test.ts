import chai, { expect } from "chai";
import { cleanDecklistArray } from './index';

chai.should();

describe("Testing array cleaning methods", () => {
	it("You've cleaned an array of 1 invalid URL from the first index", () => {
		const deckListArray = {
			"decklists": [
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "hahaIamnotaURL"
				},
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				}
			]
		}
		expect(cleanDecklistArray(deckListArray.decklists)).to.have.length(1);
	})
	it("You've cleaned an array of 1 invalid URL from the second index", () => {
		const deckListArray = {
			"decklists": [
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				},
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "hahaIamnotaURL"
				}
			]
		}
		expect(cleanDecklistArray(deckListArray.decklists)).to.have.length(1);
	})
	it("You've cleaned an array of 2 invalid URL", () => {
		const deckListArray = {
			"decklists": [
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				},
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "hahaIamnotaURL"
				},
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "Another broken URL is here!"
				}
			]
		}
		expect(cleanDecklistArray(deckListArray.decklists)).to.have.length(1);
	})
	it("You've cleaned an array with all invalid URLs", () => {
		const deckListArrayNoValidUrls = {
			"decklists": [
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "This is going to be 0 if it passes"
				},
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "hahaIamnotaURL"
				}
			]
		}
		expect(cleanDecklistArray(deckListArrayNoValidUrls.decklists)).to.have.length(0);
	});
	it("You've cleaned an array that started with 3 invalid URLs", () => {
		const deckListArrayNoValidUrls = {
			"decklists": [
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "Bad URL Number 1 Hahaha!"
				},
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "This is going to be 0 if it passes"
				},
				{
					"color": "#FF0000",
					"commander": "A Broken Commander",
					"url": "hahaIamnotaURL"
				},
				{
					"commander": "Yawgmoth, Thran Physician",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				}
			]
		}
		expect(cleanDecklistArray(deckListArrayNoValidUrls.decklists)).to.have.length(1);
	});
	it("You've cleaned no elements since all URLs were valid", () => {
		const deckListArrayNoValidUrls = {
			"decklists": [
				{
					"commander": "Yawgmoth, Thran Physician 1",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				},
				{
					"commander": "Yawgmoth, Thran Physician 2",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				},
				{
					"commander": "Yawgmoth, Thran Physician 3",
					"url": "https://www.moxfield.com/decks/jAS0WPfBt0CKyATKXvMS0g"
				}
			]
		}
		expect(cleanDecklistArray(deckListArrayNoValidUrls.decklists)).to.have.length(3);
	});
})