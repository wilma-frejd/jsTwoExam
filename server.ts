import express, { type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;
const isProduction = process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const app = express();

  let vite;
  if(!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer ({
        server: { middlewareMode: true },
        appType: "spa",
        root: __dirname,
    });
    app.use(vite.middlewares);
  } else {
    app.get("/", ({ res }: { res: Response }) => {
    res.sendFile(path.join(__dirname, "index.html"));
    });
  }  
  app.listen(port, () => {
    console.log(
        `running ${
        isProduction ? "PROD" : "DEV"
      } server at http://localhost:${port}`
    );
  });
}

main().catch((error) => console.log(error));
