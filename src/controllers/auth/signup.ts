import { RequestHandler } from "express";
import { Service } from "../../constants/service";
import { UserDTO } from "../../models/user";
import UserService from "../../services/UserService";

export const signup: RequestHandler = async (req, res) => {
  if (await UserService.signup(req.body as UserDTO))
    return res.status(200).retJson(Service.AUTH, true);
  else
    return res
      .status(400)
      .retJson(Service.AUTH, false, { reason: "user already exists" });
};
