import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import EvaluationService from "../../services/EvaluationService";

export const evaluateWithout: RequestHandler = async (req, res) => {
  const codeResult = await EvaluationService.evaluateRaw(
    req.body.code as string
  );

  return res.retJson(Service.EVAL, codeResult, codeResult);
};
