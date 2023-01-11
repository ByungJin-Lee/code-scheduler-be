import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import db from "./index";

interface IToken {
  email: string;
  token: string;
}

class TokenModel extends Model<IToken> {}

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
      allowNull: true,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "memberToken",
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
