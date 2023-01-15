import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import ScheduleService from "../../services/ScheduleService";

export const update: RequestHandler = async (req, res) => {
  const ret = await ScheduleService.updateById(Number(req.params.id), req.body);

  return res.retJson(Service.SCHEDULE, ret);
};
