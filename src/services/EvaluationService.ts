import cp from "child_process";
import pidusage, { Status } from "pidusage";
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
			stdout: "",
			stderr: "",
			cpuUsage: -1,
			memoryUsage: -1,
			executedAt: -1,
			runningTime: -1
		}
		
		return new Promise((resolve, reject) => {
			const child: cp.ChildProcessWithoutNullStreams = cp.spawn("node", [absPath]);
			// pidusage(child.pid!, (err: Error | null, stat: Status) => {
			// 	result.cpuUsage = stat.cpu,
			// 	result.memoryUsage = stat.memory,
			// 	result.executedAt = stat.timestamp,
			// 	result.runningTime = stat.elapsed
			// })
			child.stdout.on("data", (data) => {
				result.stdout += data.toString();
			})
			child.stderr.on("data", (data) => {
				result.stderr += data.toString();
			})
			child.on("exit", (code) => {
				if (code == 0)
					resolve(result);
				else
					reject(code);
			})
		});
	}
}