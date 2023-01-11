import { Router } from "express";
import { Service } from "../constants/service";
import auth from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.retJson(Service.ANY, true, "welcome");
});

router.get("/a", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <form method="post" action="/auth/login">
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">제출</button>
      </form>
    </body>
  </html>
  `);
});

router.use("/auth", auth);

export default router;
