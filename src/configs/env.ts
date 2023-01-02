import { config } from "dotenv";
import path from "path";
import { ENV_DEV_NAME, ENV_PRODUCTION_NAME } from "../constants/file";
import { AppConfiguration } from "../types/environment";

const ROOT_DIR = path.join(__dirname, "../", "../");

switch (process.env.NODE_ENV) {
  case "production":
    config({ path: path.join(ROOT_DIR, ENV_PRODUCTION_NAME) });
    break;
  case "development":
  default:
    config({ path: path.join(ROOT_DIR, ENV_DEV_NAME) });
}

export default {
  ROOT_DIR,
  PORT: Number(process.env.PORT) || 8080,
} as AppConfiguration;
