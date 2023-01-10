import { DataTypes, Model } from "sequelize";
import db from "./index";

class TokenModel extends Model {}

TokenModel.init(
  {
    email: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "token",
    // 자동으로 createdAt, editedAt 필드를 생성하지 않음
    timestamps: false,
    // 자동으로 필드명 끝에 's'를 붙이지 않음
    freezeTableName: true,
  }
);

interface TokenDTO {
  email: string;
  token: string;
}

export { TokenModel, TokenDTO };
