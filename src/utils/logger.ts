import { createLogger, format } from "winston";

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => {
  return "";
});

const logger = {
  info(msg: string) {},
  error(tag: string, err?: any) {},
};

export default logger;
