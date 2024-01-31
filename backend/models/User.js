import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

//  function validate Register User

function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    username: Joi.string().trim().alphanum().min(3).max(200).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

/**
 * @desc function validate Update User
 * @access public
 */
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100),
    username: Joi.string().trim().alphanum().min(3).max(200),
    password: Joi.string().trim().alphanum().min(3).max(200),

  });
  return schema.validate(obj);
}

/**
 * @desc function validate Login user
 * @access public
 */
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().min(5).max(100).required(),
    password: Joi.string().trim().alphanum().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

export {
  User,
  validateRegisterUser,
  validateUpdateUser,
  validateLoginUser,
};
