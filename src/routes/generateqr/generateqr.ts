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
		qrcode.toDataURL(req.body.url).then(url => {
			res.send(url);
		})
	})

export default router;