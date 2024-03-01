import express from "express";
import { TransationService } from "../services/transaction.service";
import { checkEmailInRequest } from "../helpers/user.helper";

const router = express.Router();

router.post("/api/user/login", checkEmailInRequest, TransationService);

export default router;
