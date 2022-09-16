"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcode_1 = __importDefault(require("qrcode"));
const router = express_1.default.Router();
const jsonParser = express_1.default.json();
router
    .route("/")
    .get((_req, res) => {
    return res.status(200).json({
        message: "We've successfully hit the generateqr GET endpoint.",
        status: "success"
    });
})
    .post(jsonParser, (req, res) => {
    qrcode_1.default.toDataURL(req.body.url).then(url => {
        res.send(url);
    });
});
exports.default = router;
