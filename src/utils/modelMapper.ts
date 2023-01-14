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

	public static async createModel(dto: UserDTO): Promise<UserModel> {
		return await UserModel.create({
      email: dto.email,
      password: dto.password,
    });	
	}
}

export class ScheduleMapper extends ModelMapper {
	public static getDto(model: ScheduleModel): ScheduleDTO {
		return super._getDto<ScheduleModel, ScheduleDTO>(model);
	}

	public static async createModel(dto: ScheduleDTO): Promise<ScheduleModel> {
		return await ScheduleModel.create({
			name: dto.name,
			owner: dto.owner,
			description: dto.description,
			period: dto.period,
			next: dto.next,
			active: dto.active
		});
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
			runningTime: model.dataValues.runningTime,
			resultOf: model.dataValues.resultOf
		} as EvalResultDTO;
	}

	public static async createModel(dto: EvalResultDTO): Promise<EvalResultModel> {
		return await EvalResultModel.create({
			id: dto.id,
			sid: dto.sid,
			stdout: dto.stdout.toString(),
			stderr: dto.stderr.toString(),
			cpuUsage: dto.cpuUsage,
			memoryUsage: dto.memoryUsage,
			executedAt: dto.executedAt,
			runningTime: dto.runningTime,
			resultOf: dto.resultOf
		})
	}
}