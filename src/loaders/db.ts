import db from "../models";
import logger from "../utils/logger";

export default function loadDB() {
  return new Promise((resolve, reject) => {
    db.sequelize
      .sync({ force: false })
      .then(() => {
        logger.info("DB 연결 성공");
        resolve(null);
      })
      .catch((err) => {
        logger.error("DB 연결 실패", err);
        reject(err);
      });
  });
}
