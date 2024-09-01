import { Request, Response, NextFunction } from "express";
import { signupService, signinService } from "./auth.service";
import { signinValidation, signupValidation } from "./auth.validaton";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate request body
    const parsedBody = signupValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.errors[0].message });
    }

    const user = await signupService(parsedBody.data, req);

    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate request body
    const parsedBody = signinValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.errors[0].message });
    }

    // Authenticate user and generate JWT
    const { user, token } = await signinService(parsedBody.data, req);

    // Set the JWT in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    // Respond with user data
    res.status(200).json({
      success: true,
      token: token,
      message: "User signed in successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
