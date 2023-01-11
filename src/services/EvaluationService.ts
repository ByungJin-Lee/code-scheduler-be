import { ScheduleModel } from "../models/schedule";


/**
 * 코드 평가와 관련된 서비스
 */
export default class EvaluationService {
	private static instance: EvaluationService = new EvaluationService();

	public getInstance = () => EvaluationService.instance;

	load(timeRange: number) {
		let schedules: ScheduleModel[] = ScheduleModel.findAll({
			where: { next: { lte: Math.trunc(Date.now() / 1000) + timeRange }}
		})		
	}
}