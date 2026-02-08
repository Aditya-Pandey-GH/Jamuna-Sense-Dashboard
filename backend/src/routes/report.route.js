import express from "express";
import { Report } from "../models/Report.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const report = await Report.create(req.body);
		console.log(report);
		// res.send("LOL LMAO");
		res.status(201).json({ success: true, report });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

export default router;
