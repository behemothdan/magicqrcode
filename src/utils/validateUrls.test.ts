import chai, { expect } from "chai";
import { validateUrls } from './index';

chai.should();

describe("Testing array cleaning methods", () => {
	it("You've provided a string that is not a URL.", () => {
		expect(validateUrls("This is not a URL at all.")).to.equal(null);
	})
	it("You've provided a valid Moxfield URL", () => {
		expect(validateUrls("https://www.moxfield.com/decks/15HMKmz_Xkae-l9LbuT83A")).to.equal("https://www.moxfield.com/decks/15HMKmz_Xkae-l9LbuT83A");
	})
	it("You've provided a valid URL not from a Magic deck site", () => {
		expect(validateUrls("https://twitter.com/VoxyTwitch")).to.equal(null);
	})
});