import { Router } from "express";
import EvaluationService from "../services/EvaluationService";
import ScheduleService from "../services/ScheduleService";

const router = Router();

router.use("/evaluate", async (req, res) => {
  let id = await ScheduleService.create(req.body.meta, req.body.content);
  if (!id)
    return res.status(400).send("evaluation failed!");
    
  let stat = await EvaluationService.evaluate(id);
  return res.status(200).send(stat);
})

export default router;