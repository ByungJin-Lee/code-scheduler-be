import { DBConfiguration } from "../types/environment";

export default {
  username: process.env.username || "null",
  password: process.env.password || "null",
  host: process.env.host || "null",
  database: process.env.database || "null",
  dialect: process.env.dialect || "null",
  db_port: Number(process.env.db_port) || 3306,
} as DBConfiguration;
