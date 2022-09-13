"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .route("/")
    .get((_req, res) => {
    return res.status(200).json({
        message: "We've returned the generic endpoint.",
        status: "success"
    });
});
exports.default = router;
