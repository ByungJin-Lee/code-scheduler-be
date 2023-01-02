import { Application } from "express";
import preprocessJson from "../middlewares/preprocessJson";

export default async function loadMiddleware(app: Application) {
  app.use(preprocessJson);
}
