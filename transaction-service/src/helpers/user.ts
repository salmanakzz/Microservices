import { NextFunction, Request, Response } from "express";

type CustomRequest = Request & { userId?: string };

export const handleUserIdInRequest = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"];

  if (userId) {
    req.userId = userId as string;
    next();
  } else {
    res.send("UserId not found");
  }
};
