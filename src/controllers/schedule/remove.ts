import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import ScheduleService from "../../services/ScheduleService";

export const remove: RequestHandler = async (req, res) => {
  const ret = await ScheduleService.removeById(Number(req.params.id));

  return res.retJson(Service.SCHEDULE, ret);
};
