import { Sequelize } from "sequelize";
import config from "../configs/db";

const db = {
  sequelize: new Sequelize(config.database, config.db_username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.db_port,
  }),
};

export default db;
