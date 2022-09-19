"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcode_1 = __importDefault(require("qrcode"));
const utils_1 = require("../../utils");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
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
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlArray = req.body.url.split(",");
    const arrayOfQRCodes = [];
    const qrCodeDoc = new pdfkit_1.default();
    qrCodeDoc.pipe(fs_1.default.createWriteStream('qrcodes.pdf'));
    yield Promise.all(urlArray.map((deckUrl) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, utils_1.validateUrls)(deckUrl)) {
            yield qrcode_1.default.toDataURL(deckUrl).then(url => {
                fs_1.default.writeFileSync("qrcode.png", url);
                arrayOfQRCodes.push(url);
            });
        }
        ;
    })));
    if (arrayOfQRCodes.length > 0) {
        res.send(arrayOfQRCodes);
    }
    else {
        res.send(utils_1.feedbackMessages.noQrCodesGenerated);
    }
}));
exports.default = router;
