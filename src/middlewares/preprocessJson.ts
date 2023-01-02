import { NextFunction, Request, Response } from "express";

const preprocessJson = (req: Request, res: Response, next: NextFunction) => {
  res.retJson = (data: any) => {
    console.log(req.userId);
    console.log("json return");
    res.json(data);
  };
  next();
};

export default preprocessJson;
