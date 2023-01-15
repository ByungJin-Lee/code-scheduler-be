import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import EvaluationService from "../../services/EvaluationService";

export const evaluateWith: RequestHandler = async (req, res) => {
  const result = await EvaluationService.evaluate(parseInt(req.params["id"]));

  return res.retJson(Service.EVAL, result, result);
};
