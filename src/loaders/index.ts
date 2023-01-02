import Express from "express";
import loadDB from "./db";
import loadMiddleware from "./middleware";
import * as expressType from "../types/express";

export default async function buildApp() {
  const app = Express();

  await loadDB();
  loadMiddleware(app);

  return app;
}
