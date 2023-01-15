import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import ScheduleService from "../../services/ScheduleService";

export const create: RequestHandler = async (req, res) => {
  const { code, ...dto } = req.body;

  dto.owner = req.user?.email;

  const ret = await ScheduleService.create(dto, code);

  return res.retJson(Service.SCHEDULE, ret);
};
