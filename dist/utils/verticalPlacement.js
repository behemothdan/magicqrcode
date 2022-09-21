"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVerticalPlacement = void 0;
function calculateVerticalPlacement(qrIndex, isText) {
    return ((isText ? 150 : 15) + (Math.floor(qrIndex / 4) * 160));
}
exports.calculateVerticalPlacement = calculateVerticalPlacement;
