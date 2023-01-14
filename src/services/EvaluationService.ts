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

		const child: cp.ChildProcess = cp.exec(`node ${absPath}}`, (error, stdout, stderr) => {
			result.stdout = stdout;
			result.stderr = stderr;
		})
		// let child: cp.ChildProcessWithoutNullStreams;
		// child = cp.spawn("chcp", [`65001>null && node ${absPath}`]);
		// child.stdout.on("data", (data) => {
		// 	result.stdout.concat(data + "\n");
		// })
		// child.stderr.on("data", (data) => {
		// 	result.stderr.concat(data + "\n");
		// })

		console.log("res:")
		console.log(result);

		// pidusage(child.pid!, (err: Error | null, stat: Status) => {
		// 	result.cpuUsage = stat.cpu,
		// 	result.memoryUsage = stat.memory,
		// 	result.executedAt = stat.timestamp,
		// 	result.runningTime = stat.elapsed
		// })

		return result;
	}
}