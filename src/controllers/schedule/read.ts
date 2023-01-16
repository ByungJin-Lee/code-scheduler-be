import { RequestHandler } from "express";
import { readFile } from "fs";
import { Service } from "../../constants/service";
import ScheduleService from "../../services/ScheduleService";

export const read: RequestHandler = async (req, res) => {
  if (!req.user) throw Error("No User");

  const data = await ScheduleService.getByOwner(req.user.email);

  return res.retJson(Service.SCHEDULE, data, data);
};

export const readWith: RequestHandler = async (req, res) => {
  if (!req.user) throw Error("No User");

  const data = await ScheduleService.getByOwnerAndId(
    req.user.email,
    Number(req.params.id)
  );

  readFile(ScheduleService.getPath(Number(req.params.id)), (err, content) => {
    return res.retJson(Service.SCHEDULE, err, { ...data, code: content });
  });
};
