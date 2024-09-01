import { Request, Response, NextFunction } from "express";
import { signupService, signinService } from "./auth.service";
import { signinValidation, signupValidation } from "./auth.validaton";

// Controller function to signup a new user
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate request body
    const parsedBody = signupValidation.safeParse(req.body);

    const user = await signupService(parsedBody, req);
    return res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to signin a user
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const parsedBody = signinValidation.safeParse(req.body);
    if (!parsedBody.success) {
      throw {
        status: 400,
        success: false,
        error: parsedBody.error,
      };
    }
    const user = await signinService(req, res);
    return res.status(200).json({
      success: true,
      data: user,
      message: "Signed in successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        error: error.message || error.message,
      });
    }
    next(error);
  }
};
