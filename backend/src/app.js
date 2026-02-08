import express from "express";
import cors from "cors";

import router from "./routes/report.route.js";

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	}),
);

// ✅ Routes
app.get("/", (req, res) => {
	res.send("✅ API is running...");
});

app.use("/api/reports", router);

export default app;
