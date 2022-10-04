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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArray.decklists)).to.have.length(1);
    });
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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArray.decklists)).to.have.length(1);
    });
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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArray.decklists)).to.have.length(1);
    });
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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArrayNoValidUrls.decklists)).to.have.length(0);
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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArrayNoValidUrls.decklists)).to.have.length(1);
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
        };
        (0, chai_1.expect)((0, index_1.cleanDecklistArray)(deckListArrayNoValidUrls.decklists)).to.have.length(3);
    });
});
