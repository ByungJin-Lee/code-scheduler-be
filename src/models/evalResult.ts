import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import db from "./index";
import { ScheduleModel } from "./schedule";

class EvalResultModel extends Model {}

const attributes: sequelize.ModelAttributes = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	sid: {
		type: DataTypes.INTEGER,
		allowNull: false		
	},
	stdout: {
		type: DataTypes.STRING,
		allowNull: false
	},
	stderr: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cpuUsage: {
		type: DataTypes.INTEGER,
		allowNull: false		
	},
	memoryUsage: {
		type: DataTypes.INTEGER,
		allowNull: false		
	},
	executedAt: {
		type: DataTypes.INTEGER,
		allowNull: false		
	},
	runningTime: {
		type: DataTypes.INTEGER,
		allowNull: false		
	},
}

const options: sequelize.InitOptions = {
	sequelize: db.sequelize,
	modelName: "eval_result",
	// 자동으로 createdAt, editedAt 필드를 생성하지 않음
	timestamps: false,
	// 자동으로 필드명 끝에 's'를 붙이지 않음
	freezeTableName: true
}

EvalResultModel.init(attributes, options)

EvalResultModel.belongsTo(ScheduleModel, {
	foreignKey: "result_of",
	onDelete: "cascade",
	onUpdate: "cascade"
})

interface EvalResultDBVO {
	id: number,
	sid: number,
	stdout: string,		// json array
	stderr: string,		// json array
	cpuUsage: number,
	memoryUsage: number,
	executedAt: number,
	runningTime: number
}

interface EvalResultDTO {
	id: number,
	sid: number,
	stdout: string[],
	stderr: string[],
	cpuUsage: number,
	memoryUsage: number,
	executedAt: number,
	runningTime: number
}

export { EvalResultModel, EvalResultDBVO, EvalResultDTO }