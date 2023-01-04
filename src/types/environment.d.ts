import { Dialect } from "sequelize";

export { AppConfiguration, DBConfiguration };

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<keyof AppConfiguration, string>,
        Record<keyof DBConfiguration, string> {
      NODE_ENV: "production" | "development";
    }
  }
}

interface AppConfiguration {
  ROOT_DIR: string;
  PORT: number;
}

interface DBConfiguration {
  db_username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  db_port: number;
}
