import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
  },
});

const User = mongoose.model(userCollection, UserSchema);

export default User;
