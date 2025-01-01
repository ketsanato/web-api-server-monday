const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Plase confirm your password"],
    validate: {
      validator: function (e1) {
        return e1 === this.password;
      },
      message: "Password are not same",
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    typ: String,
    default: null,
  },
  otpExpire: {
    type: Date,
    default: null,
  },
  resetPasswordOTP: {
    type: String,
    default: null,
  },
  resetPasswordOTP: {
    type: Date,
    default: null,
  },
  user_online: {
    type: Boolean,
  },
  user_type_id: [{ type: Schema.Types.ObjectId, ref: "user_types" }],

  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }

    throw Error("incorrect password !!!");
  }

  throw Error("incorrect Email!!!!");
};

module.exports = mongoose.model("tb_users", userSchema);
