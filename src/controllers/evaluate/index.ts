import { Router } from "express";
import {
  evaluate_with,
  evaluate_without,
  param_id,
} from "../../middlewares/validator";
import { evaluateWith } from "../evaluate/evaluateWith";
import { evaluateWithout } from "../evaluate/evaluateWithout";
import { read } from "./read";
import { remove } from "./remove";

const router = Router();

router.get("/:id", param_id, read); // sid
router.delete("/:id", param_id, remove);

router.post("/", evaluate_without, evaluateWithout);
router.post("/:id", evaluate_with, evaluateWith);

export default router;
