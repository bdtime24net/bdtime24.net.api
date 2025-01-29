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

import veryfyToken from "./auth.middleware";

const authRoutes: Router = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

authRoutes.put("/update/:id", veryfyToken, updateController);
authRoutes.put("/change-password/:id", veryfyToken, changePasswordController);
authRoutes.delete("/delete/:id", veryfyToken, deleteAccountController);

authRoutes.post("/forgot-password", forgotPasswordController);

authRoutes.post("/logout", veryfyToken, logoutController);

export default authRoutes;
