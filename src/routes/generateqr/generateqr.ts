import express, { Response, Request } from "express";
import qrcode from "qrcode";
import { validateUrls } from '../../utils';

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
		 * Loop over each submitted decklist link
		 * and generate individual QR codes for each one.
		 * Remember that forEach loops are bad for async code.
		 * So we use this map instead.
		 */
		await Promise.all(urlArray.map(async (deckUrl: string) => {
			if(validateUrls(deckUrl)) {
				await qrcode.toDataURL(deckUrl).then(url => {
					arrayOfQRCodes.push(url);
				})
			};
		}))

		/**
		 * Eventually this will be used to place all
		 * the generated images within a printable
		 * file or template for the user.
		 */
		res.send(arrayOfQRCodes);
	})

export default router;