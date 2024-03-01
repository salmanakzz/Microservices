import mongoose, { Schema } from "mongoose";

export interface UserAttributes {
  _id: Schema.Types.ObjectId;
  email: string;
}

const UserSchema: Schema<UserAttributes> = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<UserAttributes>("UserDetail", UserSchema);

export default UserModel;
