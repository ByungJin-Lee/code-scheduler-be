import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import db from "./index";

class UserModel extends Model {}

UserModel.init({
	email: {
		type: DataTypes.STRING(255),
		primaryKey: true,
		unique: true,
		allowNull: true
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('now()')
	}
  },
  {
		sequelize: db.sequelize,
		modelName: "member",
		// 자동으로 createdAt, editedAt 필드를 생성하지 않음
		timestamps: false,
		// 자동으로 필드명 끝에 's'를 붙이지 않음
		freezeTableName: true
  }
)

interface UserDTO {
	email: string,
	password?: string,
	createdAt?: Date
}

export { UserModel, UserDTO };
