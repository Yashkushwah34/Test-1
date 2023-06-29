import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { emailValidator } from "../helperFunctions/regx.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email-Id"],
      unique: [true, "Email Id already registered"],
      validate: {
        validator: function (val) {
          if (!emailValidator.test(val)) {
            return false;
          }
        },
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    number: {
      type: String,
      required: [true, "Please provide mobile number"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("user", userSchema);

export default User;
