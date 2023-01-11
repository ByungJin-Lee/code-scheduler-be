import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";
import { ScheduleMapper } from "../utils/modelMapper";
import fs from "fs"
import path from "path"

export default class ScheduleService {

	static async getSchedule(id: number): Promise<ScheduleDTO | null> {
		let schedule: ScheduleModel | null = await ScheduleModel.findByPk(id);
		if (!schedule)
			return null;
		return ScheduleMapper.getDto(schedule);
	}

	static async create(meta: ScheduleDTO, code: string) {
		fs.writeFile(path.join(process.env.CODE_DIR))
	}
}