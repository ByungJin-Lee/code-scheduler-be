import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import EvaluationService from "../../services/EvaluationService";

export const read: RequestHandler = async (req, res) => {
  const data = EvaluationService.getEvalResultByScheduleId(
    Number(req.params.id)
  );
  return res.retJson(Service.EVAL, data, data);
};
