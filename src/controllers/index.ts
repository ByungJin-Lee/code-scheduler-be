import { Router } from "express";
import { Service } from "../constants/service";
import ScheduleService from "../services/ScheduleService";
import auth from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.retJson(Service.ANY, true, "welcome");
});

router.use("/auth", auth);

export default router;
