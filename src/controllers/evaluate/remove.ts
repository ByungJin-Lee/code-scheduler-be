import { RequestHandler } from "express";
import { Service } from "../../constants/service";

import EvaluationService from "../../services/EvaluationService";

export const remove: RequestHandler = async (req, res) => {
  const data = await EvaluationService.remove(Number(req.params.id));

  return res.retJson(Service.EVAL, data);
};
