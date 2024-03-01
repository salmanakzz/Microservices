import express, { NextFunction, Request, Response } from "express";
import { checkUserInRequest } from "../helpers/user.helper";
import { TransationService } from "../services/transaction.service";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  checkUserInRequest(req, res, next).catch(next);
});

router.all("/api/transaction/*", TransationService);

router.all("/api/user/*", TransationService);

export default router;
