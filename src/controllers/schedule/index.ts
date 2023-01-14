import { Router } from "express";
import { evaluate_with, evaluate_without } from "../../middlewares/validator";
import { evaluateWithout } from "./evaluateWithout";

const router = Router();

router.post("/evaluate", evaluate_without, evaluateWithout);
router.post("/evaluate/:id", evaluate_with, evaluateWithout);

export default router;
