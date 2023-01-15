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
    let schedule: ScheduleModel = await ScheduleMapper.createModel({
      name: meta.name,
      owner: meta.owner,
      description: meta.description,
      period: meta.period,
      next: meta.next,
      active: meta.active,
    } as ScheduleDTO);

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

  static async getByOwner(owner: string) {
    return await ScheduleModel.findAll({
      where: {
        owner: owner,
      },
    });
  }

  static async getByOwnerAndId(owner: string, id: number) {
    return await ScheduleModel.findOne({
      where: {
        owner: owner,
        id: id,
      },
    });
  }

  static async removeById(id: number) {
    return await ScheduleModel.destroy({ where: { id: id } });
  }

  static async updateById(id: number, dto: ScheduleDTO) {
    return await ScheduleModel.update(dto, { where: { id: id } });
  }
}
