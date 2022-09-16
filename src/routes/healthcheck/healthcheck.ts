import express, { Response, Request } from "express";

const router = express.Router();

/** This file tests our ability to use the database
 * using our healthcheck endpoints for inserting,
 * retrieving and deleting. We prefixed all the req
 * with an underscore to keep Typescript happy since
 * they need to be included in the API methods even
 * though they are not being used here. In other files
 * the underscore should be removed.
 */
router
	.route("/")
	.get((_req: Request, res: Response) => {
		return res.status(200).json({
			message: "We've successfully hit the health check endpoint.",
			status: "success"
		});
	})

export default router;