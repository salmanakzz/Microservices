import mongoose, { Schema } from "mongoose";

export interface MasterUserAttributes {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

const MasterUserSchema: Schema<MasterUserAttributes> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const MasterUserModel = mongoose.model<MasterUserAttributes>(
  "MasterUser",
  MasterUserSchema
);

export default MasterUserModel;
