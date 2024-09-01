// auth.routes.ts
import { Router } from "express";
import {
  signupController,
  signinController,
  updateController,
  changePasswordController,
  deleteAccountController,
  forgotPasswordController,
} from "./auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

authRoutes.put("/update/:id", updateController);
authRoutes.put("/change-password/:id", changePasswordController);
authRoutes.delete("/delete/:id", deleteAccountController);

authRoutes.post("/forgot-password", forgotPasswordController);


export default authRoutes;
