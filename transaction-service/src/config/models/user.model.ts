import mongoose, { Schema } from "mongoose";

export interface UserAttributes {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
}

const UserSchema: Schema<UserAttributes> = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<UserAttributes>("UserDetail", UserSchema);

export default UserModel;
