import { Request, Response } from "express";
import UserModel from "../config/models/user.model";

type CustomRequest = Request & { userId?: string };

export const userLogin = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.status(404).json("User not found.");

  res.status(200).json({ status: true, data: user });
};

export const getSingleUser = async (req: CustomRequest, res: Response) => {
  const user = await UserModel.findOne({ _id: req.userId });

  if (!user) return res.status(404).json("User not found.");

  res.status(200).json({ status: true, data: user });
};
