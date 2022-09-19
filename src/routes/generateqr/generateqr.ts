import express, { Response, Request } from "express";
import qrcode from "qrcode";
import { validateUrls, feedbackMessages } from '../../utils';
import PDFDocument from "pdfkit";

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
		const urlArray = req.body.url.split(",");
		const arrayOfQRCodes: string[] = [];

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
		 */
		await Promise.all(urlArray.map(async (deckUrl: string, index: any) => {
			if (validateUrls(deckUrl)) {
				await qrcode.toDataURL(deckUrl).then(url => {
					qrCodeDoc.image(url, 10 + (index * 144), 15, { fit: [144, 144] })
						.text("Yawgmoth, Thrawn Physician", 10 + (index * 144), 150, { width: 144, align: 'center' });
					arrayOfQRCodes.push(url);
				})
			};
		}))

		/**
		 * Eventually this will be used to place all
		 * the generated images within a printable
		 * file or template for the user.
		 */
		if (arrayOfQRCodes.length > 0) {
			qrCodeDoc.on('data', (chunk) => stream.write(chunk));
			qrCodeDoc.on('end', () => stream.end());
			qrCodeDoc.end();
			// qrCodeDoc.pipe(res);
			// res.send(arrayOfQRCodes);
		} else {
			res.send(feedbackMessages.noQrCodesGenerated);
		}
	})

export default router;