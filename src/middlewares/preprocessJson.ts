import { NextFunction, Request, Response } from "express";

const preprocessJson = (req: Request, res: Response, next: NextFunction) => {
  res.retJson = (service, ok, data = null) => {
    res.json({
      service,
      ok: ok ? true : false,
      data,
    });
  };
  next();
};

export default preprocessJson;
