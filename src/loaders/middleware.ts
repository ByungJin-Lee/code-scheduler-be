import { Application } from "express";
import passport from "../middlewares/passport";
import preprocessJson from "../middlewares/preprocessJson";

export default async function loadMiddleware(app: Application) {
  app.use(preprocessJson);
  app.use(passport.initialize());
}
