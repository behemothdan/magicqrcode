"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVerticalPlacement = void 0;
function calculateVerticalPlacement(qrIndex, isText) {
    return ((isText ? 150 : 15) + (Math.floor((qrIndex % 16) / 4) * 185));
}
exports.calculateVerticalPlacement = calculateVerticalPlacement;
