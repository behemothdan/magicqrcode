import { qrrequest } from "../../types/qrrequest";
import {
	calculateHorizontalPlacement,
	calculateVerticalPlacement,
	feedbackMessages,
	validateUrls
} from '../../utils';
import express, { Response, Request } from "express";
import PDFDocument from "pdfkit";
import qrcode from "qrcode";

const router = express.Router();
const jsonParser = express.json();

router
	.route("/")
	.get((_req: Request, res: Response) => {
		return res.status(200).json({
			message: "We've successfully hit the generateqr GET endpoint.",
			status: "success"
		});
	})
	.post(jsonParser, async (req: Request, res: Response) => {
		/**
		 * This instantiates our blank PDF canvas at a printable size.
		 * We also set some header content like file type, file name, etc.
		 * The name could be set dynamically if we wanted but I don't
		 * think it is important for this implementation.
		 */
		const qrCodeDoc = new PDFDocument({ size: 'A4', margin: 15, bufferPages: true });
		const stream = res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-disposition': `attachment;filename:magicqrcodes.pdf`
		})

		/**
		 * Loop over each submitted decklist link
		 * and generate individual QR codes for each one.
		 * Remember that forEach loops are bad for async code.
		 * So we use this map instead.
		 * Math notes for height: We divide the index by 4 and floor it
		 * and multiply by 144 to place it vertically.
		 * Math notes for width: Divide the index by 4 (the width fit on the page)
		 * using the mod operator and multiply by 144
		 */
		await Promise.all(req.body.decklists.map(async (deckInfo: qrrequest, index: any) => {
			if (validateUrls(deckInfo.url)) {
				await qrcode.toDataURL(deckInfo.url, {color: {dark: deckInfo.color}}).then(url => {
					qrCodeDoc.image(url,
						calculateHorizontalPlacement(index),
						calculateVerticalPlacement(index),
						{ fit: [144, 144] })
					.fillColor(deckInfo.color ? deckInfo.color : "#000000")
					.text(deckInfo.commander,
						calculateHorizontalPlacement(index),
						calculateVerticalPlacement(index, true),
						{ width: 144, align: 'center' });
				})
			};
		}))

		/**
		 * Eventually this will be used to place all
		 * the generated images within a printable
		 * file or template for the user.
		 */
		if (req.body.decklists.length > 0) {
			qrCodeDoc.on('data', (chunk) => stream.write(chunk));
			qrCodeDoc.on('end', () => stream.end());
			qrCodeDoc.end();
		} else {
			res.send(feedbackMessages.noQrCodesGenerated);
		}
	})

export default router;