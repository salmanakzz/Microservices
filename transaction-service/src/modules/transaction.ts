import express from "express";
import {
  addTransactionHistory,
  getTransactionHistory,
} from "../controllers/transaction.contrioller";
import { handleUserIdInRequest } from "../helpers/user";

const router = express.Router();

router.use(handleUserIdInRequest);

router.post("/api/transaction/history", addTransactionHistory);

router.get("/api/transaction/history", getTransactionHistory);

export default router;
