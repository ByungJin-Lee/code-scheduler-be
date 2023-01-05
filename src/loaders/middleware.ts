import { Application } from "express";
import passport from "../middlewares/passport";
import preprocessJson from "../middlewares/preprocessJson";
import express from "express";
import expressSession from "express-session";
import env from "../configs/env";

export default async function loadMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(preprocessJson);
  app.use(expressSession({
    secret: env.JWT_SECRET_KEY,
    resave: true,
    saveUninitialized:true
  }));
  app.use(passport.initialize());
}
