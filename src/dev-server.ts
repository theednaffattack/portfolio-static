import express from "express";
import serveStatic from "serve-static";
import { internalIpV4 as ipV4 } from "internal-ip";
import { outdent } from "outdent";

const isTest = process.env["NODE_ENV"] === "test";
const PORT = process.env["PORT"] || "3000";

async function createServer() {
  const app = express().disable("x-powered-by");

  app.use(serveStatic("src/pages", { index: ["index.html"] }));
  app.listen(3001);

  return { app };
}

if (!isTest) {
  createServer()
    .then(({ app }) =>
      app.listen(PORT, async () => {
        const ip = await ipV4();

        console.log(outdent`
				⭐️⭐️⭐️
				Your server is ready!
				LOCALHOST:	http://localhost:${PORT}
				LAN:		http://${ip}:${PORT}
				⭐️⭐️⭐️`);
      })
    )
    .catch((err) => {
      console.error("Error Starting Server:\n", err);
      process.exit(1);
    });
}
