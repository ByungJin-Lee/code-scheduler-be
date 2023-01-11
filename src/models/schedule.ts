import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import db from "./index";

class ScheduleModel extends Model {}

const attributes: sequelize.ModelAttributes = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	period: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	next: {
		type: DataTypes.NUMBER,
		allowNull: false
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
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
	name: string,
	description: string,
	period?: number,
	next?: number,
	active: boolean
}

export { ScheduleModel, ScheduleDTO }