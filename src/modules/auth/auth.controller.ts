import { Request, Response, NextFunction } from "express";
import {
  signupService,
  signinService,
  updateService,
  deleteAccountService,
  changePasswordService,
} from "./auth.service";
import {
  changePasswordValidation,
  signinValidation,
  signupValidation,
  updateValidation,
} from "./auth.validaton";

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

export const updateController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate request body
    const parsedBody = updateValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.errors[0].message });
    }

    // Get user ID from request params or from authenticated user (depending on your auth setup)
    const userId = req.params.id || req.user.id;

    // Update user information
    const updatedUser = await updateService(userId, parsedBody.data);

    // Respond with the updated user data
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

// deleteController function

export const deleteAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.user.id; // Assuming user is authenticated

    await deleteAccountService(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};



// changePasswordController function

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parsedBody = changePasswordValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.errors[0].message });
    }

    const userId = req.user.id; // Assuming user is authenticated
    await changePasswordService(userId, parsedBody.data.password);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
