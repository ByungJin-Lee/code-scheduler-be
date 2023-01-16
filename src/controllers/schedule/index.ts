import { Router } from "express";
import { param_id } from "../../middlewares/validator";
import { create } from "./create";

import { read, readWith } from "./read";
import { remove } from "./remove";
import { update } from "./update";

const router = Router();

router.get("/", read);
router.get("/:id", param_id, readWith);
router.post("/", create);
router.put("/:id", param_id, update);
router.delete("/:id", param_id, remove);

export default router;
