import * as express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(express.static("public"));

function createCustomProxy(targetUrl: string) {
  return createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^/${encodeURIComponent(targetUrl)}`]: "/",
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    },
    followRedirects: true,
  });
}

app.use("/:targetUrl", (req, res, next) => {
  const { targetUrl } = req.params;
  const proxy = createCustomProxy(decodeURIComponent(targetUrl));
  proxy(req, res, next);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
