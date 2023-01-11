import { ScheduleDTO, ScheduleModel } from "../models/schedule";

export default class ScheduleService {
	private static schedules: ScheduleDTO[];

	/**
	 * 
	 * @param timeRange 현재를 기준으로 불러올 시간 범위 (ms)
	 */
	static async fetch(timeRange: number) {
		let schedules: ScheduleModel[] = await ScheduleModel.findAll({
			where: {next: {lte: Math.trunc(Date.now() / 1000) + timeRange}}
		});


	}
}