import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";

export default class ScheduleService {

	static async getSchedule(id: number) {
		let schedule: ScheduleModel | null = await ScheduleModel.findByPk(id);
	}
}