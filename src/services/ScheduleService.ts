import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";
import { ScheduleMapper } from "../utils/modelMapper";
import fs from "fs/promises"
import path from "path"
import env from "../configs/env";
import cp from "child_process";

export default class ScheduleService {

	static async getSchedule(id: number): Promise<ScheduleDTO | null> {
		let schedule: ScheduleModel | null = await ScheduleModel.findByPk(id);
		if (!schedule)
			return null;
		return ScheduleMapper.getDto(schedule);
	}

	static async create(meta: ScheduleDTO, content: string) {
		let schedule: ScheduleModel = await ScheduleModel.create({
			name: meta.name,
			description: meta.description,
			period: meta.period,
			next: meta.next,
			active: meta.active
		});

		let absPath: string = this.getPath(ScheduleMapper.getDto(schedule).id!);
		fs.writeFile(absPath, content);
	}

	static getPath(scheduleId: number) {
		return path.join(env.ROOT_DIR, env.CODE_DIR, `${scheduleId}`, ".js")
	}
}