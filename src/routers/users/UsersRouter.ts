import { Router } from "express";
import { validate } from "express-validation";
import loginSchema from "../../schemas/loginSchema.js";
import { loginUser } from "../../controllers/users/userController.js";

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
