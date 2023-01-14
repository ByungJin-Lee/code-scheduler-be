import {Model} from "sequelize";
import { EvalResultDTO, EvalResultModel } from "../models/evalResult";
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
		return {
			id: model.dataValues.id,
			sid: model.dataValues.sid,
			stdout: JSON.parse(model.dataValues.stdout),
			stderr: JSON.parse(model.dataValues.stderr),
			cpuUsage: model.dataValues.cpuUsage,
			memoryUsage: model.dataValues.memoryUsage,
			executedAt: model.dataValues.executedAt,
			runningTime: model.dataValues.runningTime
		} as EvalResultDTO;
	}
}