import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { ScheduleMapper } from "../utils/modelMapper";
import { v1 } from "uuid";
import fs from "fs/promises";
import path from "path";
import env from "../configs/env";

export default class ScheduleService {
  static async getSchedule(id: number): Promise<ScheduleDTO | null> {
    let schedule: ScheduleModel | null = await ScheduleModel.findByPk(id);
    if (!schedule) return null;
    return ScheduleMapper.getDto(schedule);
  }

  static async create(
    meta: ScheduleDTO,
    content: string
  ): Promise<number | null> {
    let schedule: ScheduleModel = await ScheduleModel.create({
      name: meta.name,
      owner: null, // todo
      description: meta.description,
      period: meta.period,
      next: meta.next,
      active: meta.active,
    });

    let id = ScheduleMapper.getDto(schedule).id!;
    let absPath: string = this.getPath(id);
    fs.writeFile(absPath, content);

    return id;
  }

  static getPath(scheduleId: number) {
    return path.join(env.ROOT_DIR, env.CODE_DIR, `${scheduleId}.js`);
  }

  static getTempPathForTest() {
    return path.join(env.ROOT_DIR, env.CODE_DIR, `${v1()}.js`);
  }
}
