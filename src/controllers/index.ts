import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.retJson(0, true, "welcome");
});

export default router;
