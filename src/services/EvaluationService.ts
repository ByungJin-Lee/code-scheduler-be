import cp from "child_process";
import { EvalResultDTO } from "../models/evalResult";
import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import ScheduleService from "./ScheduleService";


/**
 * 코드 평가와 관련된 서비스
 */
export default class EvaluationService {
	static async evaluate(scheduleId: number): Promise<EvalResultDTO | null> {
		let schedule: ScheduleDTO | null = await ScheduleService.getSchedule(scheduleId);
		if (!schedule)
			return null;

		const absPath: string = ScheduleService.getPath(scheduleId);

		let result: EvalResultDTO = {
			id: 0,
			sid: scheduleId,
			stdout: "",
			stderr: "",
			cpuUsage: 0,
			memoryUsage: 0,
			executedAt: 0,
			runningTime: 0
		}
		const child: cp.ChildProcess = cp.exec(`node ${absPath}}`, (error, stdout, stderr) => {
			
		})

		return null; // impl
	}
}