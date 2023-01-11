import { Router } from "express";
import { Service } from "../constants/service";
import auth from "./auth";
import test from "./test";

const router = Router();

router.get("/", (req, res) => {
  res.retJson(Service.ANY, true, "welcome");
});

router.use("/auth", auth);
router.use("/test", test);

export default router;
