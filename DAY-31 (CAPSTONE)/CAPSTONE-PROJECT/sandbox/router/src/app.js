import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/router/healthz", (req, res) => {
  res.status(200).json({
    message: "Sandbox healthz check passed...",
    status: "success",
    timestamp: Date(),
  });
});

app.get("/api/router/readyz", (req, res) => {
  res.status(200).json({
    message: "Sandbox readyz check passed...",
    status: "success",
    timestamp: Date(),
  });
});

const proxies = {};

function getProxy(sandboxId) {
  if (!proxies[sandboxId]) {
    const target = `http://sandbox-service-${sandboxId}:80`;

    proxies[sandboxId] = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
    });
  }
  return proxies[sandboxId];
}

app.use((req, res, next) => {
  const host = req.headers.host || "";
  const sandboxId = host.split(".")[0];


  return getProxy(sandboxId)(req, res, next);
});

export default app;
