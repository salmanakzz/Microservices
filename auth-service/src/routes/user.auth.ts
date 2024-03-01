import express from "express";
import { TransationService } from "../services/transaction.service";
import {
  checkEmailInRequest,
  checkPasswordChangeCreds,
} from "../helpers/user.helper";

const router = express.Router();

router.post("/api/user/login", checkEmailInRequest, TransationService);

router.post(
  "/api/user/password/change",
  checkPasswordChangeCreds,
  TransationService
);

export default router;
