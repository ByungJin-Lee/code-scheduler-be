import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";
import { ScheduleMapper } from "../utils/modelMapper";

export default class ScheduleService {

	static async getSchedule(id: number): Promise<ScheduleDTO | null> {
		let schedule: ScheduleModel | null = await ScheduleModel.findByPk(id);
		if (!schedule)
			return null;
		return ScheduleMapper.getDto(schedule);
	}
}