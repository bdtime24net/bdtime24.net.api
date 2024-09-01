// auth.routes.ts
import { Router } from "express";
import { signupController, signinController } from "./auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

export default authRoutes;
