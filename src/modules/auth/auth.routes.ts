// auth.routes.ts
import { Router } from "express";
import {
  signupController,
  signinController,
  updateController,
  // changePasswordController,
  deleteAccountController,
} from "./auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

authRoutes.put("/update/:id", updateController);
// authRoutes.put("/change-password/:id", authenticate, changePasswordController);
authRoutes.delete("/delete/:id", deleteAccountController);

export default authRoutes;
