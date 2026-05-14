import express from "express"
import morgan from "morgan"
import { v7 as uuid } from "uuid"
import { createPods } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/servivce.js";
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/sandbox/healthz", (req, res) => {
    res.status(200).json({
        message: "Sandbox is running...",
        status: "success",
        timestamp: Date(),
    })
})

app.post("/api/sandbox/start", async (req, res) => {
    const sandboxId = uuid()

    await Promise.all([
        createPods(sandboxId),
        createService(sandboxId)
    ])

    return res.status(200).json({
        message: "Sandbox started successfully",
        status: "success",
        timestamp: Date(),
        data: {
            sandboxId: sandboxId,
            previewUrl: `http://${sandboxId}.preview.localhost`,
        }
    })
})

app.get("/api/sandbox/readyz", (req, res) => {
    res.status(200).json({
        message: "Sandbox is ready...",
        status: "success",
        timestamp: Date(),
    })
})

export default app;