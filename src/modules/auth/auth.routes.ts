// auth.routes.ts
import { Router } from "express";
import {
  signupController,
  signinController,
  updateController,
  changePasswordController,
  deleteAccountController,
  forgotPasswordController,
  logoutController,
} from "./auth.controller";

import verifyToken from "./auth.middleware";

const authRoutes: Router = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

authRoutes.put("/update/:id", verifyToken, updateController);
authRoutes.put("/change-password/:id", verifyToken, changePasswordController);
authRoutes.delete("/delete/:id", verifyToken, deleteAccountController);

authRoutes.post("/forgot-password",  forgotPasswordController);

authRoutes.post("/logout", verifyToken, logoutController);

export default authRoutes;
