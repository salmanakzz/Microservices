import { Request, Response } from "express";
import UserModel from "../config/models/user.model";
import bcrypt from "bcryptjs";

type CustomRequest = Request & { userId?: string };

export const userLogin = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.status(404).json("User not found.");

  const status = await bcrypt.compare(req.body.password, user.password);

  if (!status) return res.status(404).json("Invalid email or password");

  res.status(200).json({ status: true, data: user });
};

export const getSingleUser = async (req: CustomRequest, res: Response) => {
  const user = await UserModel.findOne({ _id: req.userId });

  if (!user) return res.status(404).json("User not found.");

  res.status(200).json({ status: true, data: user });
};

export const changePassword = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.status(404).json("User not found.");

  const status = await bcrypt.compare(req.body.password, user.password);

  if (!status) return res.status(404).json("Invalid password");

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

  await UserModel.updateOne(
    { email: req.body.email },
    { $set: { password: hashedPassword } }
  );

  res.status(200).json({ status: true });
};
