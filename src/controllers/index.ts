import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.retJson("value");
});

export default router;
