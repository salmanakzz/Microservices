import { NextFunction, Request, Response } from "express";
import MasterUserModel from "../config/models/masteruser.model";
import { Types } from "mongoose";

type CustomRequest = Request & { userId?: string };

export async function checkUserInRequest(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId =
      req.body.userId || req.query.userId || req.headers["x-user-id"];
    if (!userId) {
      const message = "Missing userId in request";
      console.error(message);
      return res.status(400).send(message);
    }

    const user = await MasterUserModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!user) {
      const message = "User not found";
      console.error(message);
      return res.status(404).send(message);
    }

    req.userId = user.userId.toString(); // Attach userId to request object for later use
    next(); // Continue processing the request
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error"); // Handle unexpected errors
  }
}

export const checkEmailInRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    const message = "EmailId not found";
    console.error(message);
    return res.status(404).send(message);
  }
  next();
};
