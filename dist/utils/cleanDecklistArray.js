"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDecklistArray = void 0;
const validateUrls_1 = require("./validateUrls");
function cleanDecklistArray(decklistArray) {
    return decklistArray.filter((deckInfo) => (0, validateUrls_1.validateUrls)(deckInfo.url) !== null);
}
exports.cleanDecklistArray = cleanDecklistArray;
