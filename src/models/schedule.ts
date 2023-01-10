import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import db from "./index";

class ScheduleModel extends Model {}

const attributes: sequelize.ModelAttributes = {
	id: {
		type: DataTypes.NUMBER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	code: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	period: {
		type: DataTypes.NUMBER,
		allowNull: true
	},
	next: {
		type: DataTypes.NUMBER,
		allowNull: true
	}
}

const options: sequelize.InitOptions = {
	sequelize: db.sequelize,
	modelName: "schedule",
	// 자동으로 createdAt, editedAt 필드를 생성하지 않음
	timestamps: false,
	// 자동으로 필드명 끝에 's'를 붙이지 않음
	freezeTableName: true
}

ScheduleModel.init(attributes, options)

interface ScheduleDTO {
	id: number,
	code: string,
	period?: number,
	next?: number
}

export { ScheduleModel, ScheduleDTO }