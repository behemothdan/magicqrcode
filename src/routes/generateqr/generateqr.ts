import { qrrequest } from "../../types/qrrequest";
import {
	calculateHorizontalPlacement,
	calculateVerticalPlacement,
	cleanDecklistArray,
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
		 */
		const qrCodeDoc = new PDFDocument({ size: 'LETTER', margin: 15, bufferPages: true });

		/**
		 * We use this to determine if any of the objects in our POST array contained a
		 * valid URL and was successfully added to a PDF. If all of them fail, then this
		 * number will remain zero and return the message about no QR codes.
		 */
		let numberOfValidUrls = 0;

		/**
		 * Cleans the body of the POST request by calling our helper function cleanDecklistArray
		 */
		const cleanedDecklists = cleanDecklistArray(req.body.decklists);

		/**
		 * Loop over each submitted decklist link
		 * and generate individual QR codes for each one.
		 * Remember that forEach loops are bad for async code.
		 * So we use this map instead. We also cap the number of
		 * decks per session to 16, which is one page. Anything
		 * more than that and the UI gets unwieldy.
		 */
		if (cleanedDecklists !== null) {
			await Promise.all(cleanedDecklists.map(async (deckInfo: qrrequest, index: number) => {
				/**
				 * Check for valid URLs and make sure we don't parse more than 16 URLs.
				 */
				if (validateUrls(deckInfo.url) !== null && index <= 15) {
					await qrcode.toDataURL(deckInfo.url, { color: { dark: deckInfo.color } }).then(url => {
						/**
						 * This handles moving to multiple pages if the QR code is going to get
						 * cut off on the bottom of the current page.
						 */
						if ((144 + qrCodeDoc.y + qrCodeDoc.currentLineHeight(true)) > 890) {
							qrCodeDoc.addPage();
							qrCodeDoc.on('pageAdded', () => qrCodeDoc.switchToPage(qrCodeDoc.bufferedPageRange().count - 1));
						}
						/**
						 * Place the generated QR code on the page as well as line up the optional
						 * text information along with the appropriate QR code, using our placement
						 * functions to determine where they should live on the page to create
						 * an optimized sheet for printing. We also cap the deck title length to
						 * 50 characters to make sure the page prints properly without the title
						 * overlapping the lower QR codes.
						 */
						qrCodeDoc.image(url,
							calculateHorizontalPlacement(index),
							calculateVerticalPlacement(index),
							{ fit: [144, 144] })
							.fillColor(deckInfo.color ? deckInfo.color : "#000000")
							.text((deckInfo.commander ? deckInfo.commander.slice(0,50) : ""),
								calculateHorizontalPlacement(index),
								calculateVerticalPlacement(index, true),
								{ width: 140, align: 'center' });
						numberOfValidUrls++;
					})
				}
			}))
		}

		/**
		 * We want to make sure we have a valid QR code before we send the
		 * headers back to the client otherwise we can't properly send
		 * an error message if all the data is messed up.
		 */
		if (numberOfValidUrls > 0) {
			const stream = res.writeHead(200, {
				'Access-Control-Allow-Methods': "GET,HEAD,OPTIONS,POST",
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/pdf',
				'Content-disposition': `attachment;filename:magicqrcodes.pdf`
			});
			qrCodeDoc.on('data', (chunk) => stream.write(chunk));
			qrCodeDoc.on('end', () => stream.end());
			qrCodeDoc.end();
		} else {
			res.statusMessage = "No QR codes generated";
			res.status(200).send({ 'feedback': feedbackMessages.noQrCodesGenerated });
		}
	})

export default router;