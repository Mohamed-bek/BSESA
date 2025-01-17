import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "The First Name Must be Provided"],
    },
    lastName: {
      type: String,
      required: [true, "The Last Name Must be Provided"],
    },
    email: {
      type: String,
      required: [true, "The Email Must be Provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The Password Must be Provided"],
    },
    refreshToken: {
      type: String,
    },
    image: {
      type: String,
      default: "/default-avatar.jpg",
    },
    role: {
      type: String,
      enum: ["client", "admin", "coach"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

UserSchema.methods.hashPassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = model("User", UserSchema);

export default User;
