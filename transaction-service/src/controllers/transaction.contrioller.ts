import { Request, Response } from "express";
import TransactionDetailModel from "../config/models/transaction.model";

type CustomRequest = Request & { userId?: string };

export const addTransactionHistory = async (
  req: CustomRequest,
  res: Response
) => {
  const history = {
    date: new Date(req.body.history.date),
    value: req.body.history.value,
  };
  const data = {
    userId: req.userId,
    history,
  };

  const transaction = await TransactionDetailModel.findOne({
    userId: req.userId,
  });

  if (!transaction) {
    await TransactionDetailModel.create(data);
  } else {
    await TransactionDetailModel.updateOne(
      { userId: req.userId },
      { $push: { history: history } }
    );
  }

  res.status(200).json({ status: true });
};

export const getTransactionHistory = async (
  req: CustomRequest,
  res: Response
) => {
  const transaction = await TransactionDetailModel.findOne({
    userId: req.userId,
  });

  if (!transaction)
    return res
      .status(404)
      .send({ status: false, message: "No transactions found" });

  res.status(200).send({ status: true, data: transaction });
};
