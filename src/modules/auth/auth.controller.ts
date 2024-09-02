import { Request, Response, NextFunction } from "express";
import {
  signupService,
  signinService,
  deleteAccountService,
  updateService,
  changePasswordService,
  forgotPasswordService,
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
      return res.status(400).json({ error: parsedBody.error.errors });
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

// signinController function
export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Validate request body
    const parsedBody = signinValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
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

// updateController function
export const updateController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parsedBody = updateValidation.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.errors[0].message });
    }

    const userId = req.params.id; // Assuming user ID is passed in URL params
    const { user: updatedUser, token } = await updateService(
      userId,
      parsedBody.data
    );
    //  const { user, token } = await updateService(userId, parsedBody.data);
    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
        token: token,
      },
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
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
        error: null,
      });
    }

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
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    const userId = req.params.id;
    await changePasswordService(
      userId,
      parsedBody.data.oldPassword,
      parsedBody.data.newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

// forgetPasswordController

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    // Call the forgot password service
    await forgotPasswordService(email);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      error: null,
    });
  } catch (error) {
    // Forward the error to the error-handling middleware
    next(error);
  }
};
