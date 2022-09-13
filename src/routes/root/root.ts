/** @format */

import express from "express";

const router = express.Router();

router
	.route("/")
	.get((_req, res) => {
		return res.status(200).json({
			message: "We've returned the generic endpoint.",
			status: "success"
		});
	});

export default router;