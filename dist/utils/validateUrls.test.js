"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const index_1 = require("./index");
chai_1.default.should();
describe("Testing array cleaning methods", () => {
    it("You've provided a string that is not a URL.", () => {
        (0, chai_1.expect)((0, index_1.validateUrls)("This is not a URL at all.")).to.equal(null);
    });
    it("You've provided a valid Moxfield URL", () => {
        (0, chai_1.expect)((0, index_1.validateUrls)("https://www.moxfield.com/decks/15HMKmz_Xkae-l9LbuT83A")).to.equal("https://www.moxfield.com/decks/15HMKmz_Xkae-l9LbuT83A");
    });
    it("You've provided a valid URL not from Moxfield", () => {
        (0, chai_1.expect)((0, index_1.validateUrls)("https://twitter.com/VoxyTwitch")).to.equal("https://twitter.com/VoxyTwitch");
    });
});
