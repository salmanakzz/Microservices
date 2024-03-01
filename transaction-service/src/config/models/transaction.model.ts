import mongoose, { Schema } from "mongoose";

interface History {
  date: Date;
  value: string;
}

export interface TransactionDetailAttributes {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  history: Array<History>;
}

const TransactionDetailSchema: Schema<TransactionDetailAttributes> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    history: {
      type: [Object],
      required: true,
    },
  }
);

const TransactionDetailModel = mongoose.model<TransactionDetailAttributes>(
  "TransactionDetail",
  TransactionDetailSchema
);

export default TransactionDetailModel;
