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
const utils_1 = require("../../utils");
const express_1 = __importDefault(require("express"));
const pdfkit_1 = __importDefault(require("pdfkit"));
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
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qrCodeDoc = new pdfkit_1.default({ size: 'LETTER', margin: 15, bufferPages: true });
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename:magicqrcodes.pdf`
    });
    yield Promise.all(req.body.decklists.map((deckInfo, index) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, utils_1.validateUrls)(deckInfo.url)) {
            yield qrcode_1.default.toDataURL(deckInfo.url, { color: { dark: deckInfo.color } }).then(url => {
                qrCodeDoc.image(url, (0, utils_1.calculateHorizontalPlacement)(index), (0, utils_1.calculateVerticalPlacement)(index), { fit: [144, 144] })
                    .fillColor(deckInfo.color ? deckInfo.color : "#000000")
                    .text((deckInfo.commander ? deckInfo.commander : ""), (0, utils_1.calculateHorizontalPlacement)(index), (0, utils_1.calculateVerticalPlacement)(index, true), { width: 144, align: 'center' });
            });
        }
        ;
    })));
    if (req.body.decklists.length > 0) {
        qrCodeDoc.on('data', (chunk) => stream.write(chunk));
        qrCodeDoc.on('end', () => stream.end());
        qrCodeDoc.end();
    }
    else {
        res.send(utils_1.feedbackMessages.noQrCodesGenerated);
    }
}));
exports.default = router;
