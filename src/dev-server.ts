import express from "express";
import serveStatic from "serve-static";
import { internalIpV4 as ipV4 } from "internal-ip";
import { outdent } from "outdent";
import { body, validationResult } from "express-validator";
import pino from "pino-http";

const isTest = process.env["NODE_ENV"] === "test";
const PORT = process.env["PORT"] || "3000";

async function createServer() {
  const app = express().disable("x-powered-by");

  // app.use(pino({ prettyPrint: true, browser: { serialize: true } }));

  app.use(serveStatic("dist", { index: ["index.html"] }));
  // app.listen(3001);

  // add express.urlencoded to extract post request body
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // add a route to receive the post
  app.post(
    "/submit-form",
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address"),
    body("name")
      .isLength({ min: 1 })
      .withMessage("must be at least 1 character long"),
    body("message").not().isEmpty().trim().escape(),
    (req: express.Request, res: express.Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const username = req.body.username;
      res.send(req.body);
      //...
      res.end();
    }
  );

  return { app };
}

if (!isTest) {
  createServer()
    .then(({ app }) => {
      app.listen(PORT, async () => {
        const ip = await ipV4();

        console.log(outdent`
    ⭐️⭐️⭐️
    Your server is ready!
    LOCALHOST:	http://localhost:${PORT}
    LAN:		http://${ip}:${PORT}
    ⭐️⭐️⭐️`);
      });
    })
    .catch((err) => {
      console.error("Error Starting Server:\n", err);
      process.exit(1);
    });
}
