import cp from "child_process";
import { writeFileSync } from "fs";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";
import { ScheduleDTO } from "../models/schedule";
import { EvalResultMapper } from "../utils/modelMapper";
import ScheduleService from "./ScheduleService";

/**
 * 코드 평가와 관련된 서비스
 */
export default class EvaluationService {
  /**
   * 스케줄을 평가합니다.
   * @param scheduleId 스케줄 ID
   * @returns 평가 결과, ID가 invalid라면 null.
   */
  static async evaluate(scheduleId: number): Promise<EvalResultDTO | null> {
    let schedule: ScheduleDTO | null = await ScheduleService.getSchedule(
      scheduleId
    );
    if (!schedule) return null;

    const absPath: string = ScheduleService.getPath(scheduleId);
    return this.evaluateFile(absPath, scheduleId);
  }

  /**
   * raw code를 평가합니다.
   * @param scheduleId 스케줄 ID
   * @returns 평가 결과
   */
  static async evaluateRaw(code: string): Promise<EvalResultDTO> {
    const absPath: string = ScheduleService.getTempPathForTest();
    writeFileSync(absPath, code);
    return this.evaluateFile(absPath);
  }

  /**
   * 주어진 경로의 파일을 열어 평가합니다.
   * @param scheduleId 스케줄 ID
   * @returns 평가 결과
   */
  static async evaluateFile(
    filePath: string,
    from: number | undefined = undefined
  ): Promise<EvalResultDTO> {
    let result: EvalResultDTO = {
      stdout: [],
      stderr: [],
      cpuUsage: -1,
      memoryUsage: -1,
      executedAt: -1,
      runningTime: -1,
      exitCode: -1,
      sid: from ? from : -1,
    };

    return new Promise((resolve, reject) => {
      let prevCpuUsage: NodeJS.CpuUsage = process.cpuUsage();
      let prevTime: number = Date.now();

      const child: cp.ChildProcessWithoutNullStreams = cp.spawn("node", [
        filePath,
      ]);
      child.stdout.on("data", (data) => {
        result.stdout.push(data.toString());
      });
      child.stderr.on("data", (data) => {
        result.stderr.push(data.toString());
      });
      child.on("exit", (code) => {
        result.cpuUsage = process.cpuUsage(prevCpuUsage).user;
        result.memoryUsage = process.memoryUsage().heapUsed;
        result.executedAt = Math.trunc(prevTime / 1000);
        result.runningTime = Date.now() - prevTime;
        if (code) result.exitCode = code;
        if (from) EvalResultMapper.createModel(result);
        resolve(result);
      });
    });
  }

  static async getEvalResultByScheduleId(sid: number) {
    return await EvalResultModel.findAll({
      where: {
        sid: sid,
      },
    });
  }

  static async getEvalResultById(id: number) {
    return await EvalResultModel.findByPk(id);
  }
  static async remove(id: number) {
    return await EvalResultModel.destroy({ where: { id: id } });
  }
}
