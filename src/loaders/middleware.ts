import { Application } from "express";
import passport from "passport";
import preprocessJson from "../middlewares/preprocessJson";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { specs } from "../configs/swagger";

export default async function loadMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(preprocessJson);

  app.use(passport.initialize());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
