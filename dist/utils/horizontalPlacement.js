"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHorizontalPlacement = void 0;
function calculateHorizontalPlacement(qrIndex) {
    return 15 + ((qrIndex % 4) * 144);
}
exports.calculateHorizontalPlacement = calculateHorizontalPlacement;
