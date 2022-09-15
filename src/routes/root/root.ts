import express, { Response, Request } from "express";

const router = express.Router();

router
	.route("/")
	.get((_req: Request, res: Response) => {
		return res.status(200).json({
			message: "We've returned the generic endpoint.",
			status: "success"
		});
	});

export default router;