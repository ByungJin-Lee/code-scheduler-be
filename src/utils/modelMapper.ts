import {Model} from "sequelize";
import { EvalResultDBVO, EvalResultDTO, EvalResultModel } from "../models/evalResult";
import { ScheduleDTO, ScheduleModel } from "../models/schedule";
import { UserDTO, UserModel } from "../models/user";

/**
 * Model(Entity)를 DTO로 바꾸기 위한 클래스
 */
abstract class ModelMapper {
	protected static _getDto<M extends Model, D>(model: M): D {
		return model.get({plain: true}) as D;
	}
}

export class UserMapper extends ModelMapper {
	public static getDto(model: UserModel): UserDTO {
		return super._getDto<UserModel, UserDTO>(model);
	}
}

export class ScheduleMapper extends ModelMapper {
	public static getDto(model: ScheduleModel): ScheduleDTO {
		return super._getDto<ScheduleModel, ScheduleDTO>(model);
	}
}

export class EvalResultMapper extends ModelMapper {
	public static getDto(model: EvalResultModel): EvalResultDTO {
		let dbvo = model.get({plain: true}) as EvalResultDBVO;
		return {
			id: dbvo.id,
			sid: dbvo.sid,
			stdout: JSON.parse(dbvo.stdout) as string[],
			stderr: JSON.parse(dbvo.stderr) as string[],
			cpuUsage: dbvo.cpuUsage,
			memoryUsage: dbvo.memoryUsage,
			executedAt: dbvo.executedAt,
			runningTime: dbvo.runningTime
		} as EvalResultDTO
	}
}