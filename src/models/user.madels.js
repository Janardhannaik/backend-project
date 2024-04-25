import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Fullname: {
      type: String,
      required: true,
      trim: true,
    },
    Avatar: {
      type: String,
      required: true,
    },
    CoverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password required"],
    },
  },
  {
    timestamps: true,
  }
);
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
userschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userschema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      Fullname: this.Fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userschema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      Fullname: this.Fullname,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userschema);
