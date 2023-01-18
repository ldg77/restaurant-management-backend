import { body } from "express-validator";

export const registerUser = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name should be a string"),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username should be a string"),
  body("email")
    .notEmpty()
    .withMessage("e-mail is required")
    .isEmail()
    .withMessage("e-mail should be an E-mail")
    .contains("@")
    .withMessage("Should contains @"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Your password isnt strong enough"),
];
