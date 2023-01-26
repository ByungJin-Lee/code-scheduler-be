import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { ScheduleMapper } from "../utils/modelMapper";
import { v1 } from "uuid";
import fs from "fs/promises";
import path from "path";
import env from "../configs/env";
import EvaluationService from "./EvaluationService";
import { Op }from "sequelize"

export default class ScheduleService {
  /** 스케줄 불러오는 시간 간격 및 범위 (초) */
  static readonly FETCH_RANGE: number = 50;

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

  /**
   * 현재로부터 주어진 시간까지의 스케줄을 가져옴
   * @param seconds 스케줄을 가져올 시간(초)
   * @returns 가져온 스케줄 DTO
   */
  static async fetchSchedules(seconds: number): Promise<ScheduleDTO[]> {
    let now: number = Math.trunc(Date.now() / 1000);
    let schedules: ScheduleModel[] = await ScheduleModel.findAll({
      where: {
        active: 1,
        next: {
          [Op.not]: null,
          [Op.gte]: now,
          [Op.lt]: now + seconds
        }
      }
    });
    return ScheduleMapper.getDtos(schedules);
  }

  /**
   * 스케줄 DTO로부터 스케줄 실행을 예약합니다.
   * @param scheduleDtos 예약할 스케줄 DTO
   */
  static reserve(scheduleDtos: ScheduleDTO[]): void {
    let now = Math.trunc(Date.now() / 1000);

    scheduleDtos.forEach((sch) => {
      setTimeout(() => {
        EvaluationService.evaluate(sch.id!);
        if (!sch.active) return;
        if (!sch.period) return;
        sch.next = now + sch.period;
        this.updateById(sch.id!, sch);
      }, sch.next! - now)
    })
  }

  /**
   * 스케줄링 서비스를 실행합니다.
   */
  static async run() {
    console.log("scheduling started!");
    setInterval(async () => {
      this.reserve(await this.fetchSchedules(this.FETCH_RANGE));
    }, this.FETCH_RANGE * 1000);
  }
}
