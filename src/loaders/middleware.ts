import { Application } from "express";
import passport from "passport";
import preprocessJson from "../middlewares/preprocessJson";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { specs } from "../configs/swagger";
import applyPassportStrategy from "../middlewares/passport";

export default async function loadMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());

  app.use(preprocessJson);

  app.use(passport.initialize());
  applyPassportStrategy();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
