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
			sid: scheduleId,
			stdout: [],
			stderr: [],
			cpuUsage: -1,
			memoryUsage: -1,
			executedAt: -1,
			runningTime: -1
		}
		
		return new Promise((resolve, reject) => {
			let prevCpuUsage: NodeJS.CpuUsage = process.cpuUsage();

			const child: cp.ChildProcessWithoutNullStreams = cp.spawn("node", [absPath]);
			child.stdout.on("data", (data) => {
				result.stdout.push(data.toString());
			})
			child.stderr.on("data", (data) => {
				result.stderr.push(data.toString());
			})
			child.on("exit", (code) => {
				result.cpuUsage = process.cpuUsage(prevCpuUsage).user;
				result.memoryUsage = process.memoryUsage().heapUsed;
				if (code === 0)	// 정상 종료
					resolve(result);
				else
					reject(code);
			})
		});
	}
}