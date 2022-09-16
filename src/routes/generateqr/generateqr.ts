import express, { Response, Request } from "express";
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
	.post(jsonParser, (req: Request, res: Response) => {
		const urlArray = req.body.url.split(",");
		const arrayOfQRCodes: string[] = [];

		/**
		 * Loop over each submitted decklist link
		 * and generate individual QR codes for each one.
		 */
		urlArray.forEach((deckUrl: string) => {
			qrcode.toDataURL(deckUrl).then(url => {
				arrayOfQRCodes.push(url);
				console.log(arrayOfQRCodes.length);
			})
		})

		/**
		 * Eventually this will be used to place all
		 * the generated images within a printable
		 * file or template for the user.
		 */
		console.log(arrayOfQRCodes);
		res.send(arrayOfQRCodes);
	})

export default router;