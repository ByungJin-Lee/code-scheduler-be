import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";

export default class ScheduleService {

	static async test() {
		EvalResultModel;
		ScheduleModel;
	}

	static async fetch(timeRange: number) {
		let schedules: ScheduleModel[] = await ScheduleModel.findAll({
			where: {next: {lte: Math.trunc(Date.now() / 1000) + timeRange}}
		});

		schedules.forEach(sch => {
			setTimeout(() => {

			}, 1000)
		})
	}
}