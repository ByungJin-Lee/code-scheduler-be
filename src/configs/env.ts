import { config } from "dotenv";
import path from "path";
import { ENV_DEV_NAME, ENV_PRODUCTION_NAME } from "../constants/file";
import { AppConfiguration } from "../types/environment";

const ROOT_DIR = process.cwd();

switch (process.env.NODE_ENV) {
  case "production":
    console.log(path.join(ROOT_DIR, ENV_PRODUCTION_NAME));
    config({ path: path.join(ROOT_DIR, ENV_PRODUCTION_NAME) });
    break;
  case "development":
  default:
    config({ path: path.join(ROOT_DIR, ENV_DEV_NAME) });
}

export default {
  ROOT_DIR,
  PORT: Number(process.env.PORT) || 8080,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "null",
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || "null",
} as AppConfiguration;
