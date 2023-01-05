import { Router } from "express";
import passport from "passport";
import { Service } from "../../constants/service";

const router = Router();

router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.retJson(Service.AUTH, req.user ? true : false, req.user);
  }
);

export default router;
