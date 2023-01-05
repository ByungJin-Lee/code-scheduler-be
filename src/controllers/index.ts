import { Router } from "express";
import auth from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.retJson(0, true, "welcome");
});

router.use('/auth', auth)

export default router;
