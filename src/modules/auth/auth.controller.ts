// import { Request, Response, NextFunction } from "express";
// import prisma from "../../utils/prisma";
// import { signupValidation } from "./auth.validaton";
// import bcrypt from "bcryptjs";

// export const signup = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // validation of request body
//     const parsedBody = signupValidation.safeParse(req.body);
//     if (!parsedBody.success) {
//       return res.status(400).json({
//         success: false,
//         error: parsedBody.error,
//       });
//     }

//     // ip address and user agent
//     const ipAddress =
//       req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     const userAgent = req.headers["user-agent"] || "";

//     // check if user already exists\\
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: parsedBody.data.email,
//       },
//     });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(parsedBody.data.password, salt);

//     // create auth user

//     const user = await prisma.user.create({
//       data: {
//         ...parsedBody.data,
//         password: hashedPassword,
//         ipAddress,
//         userAgent,
//       } as any,
//       select: {
//         id: true,
//         username: true,
//         email: true,
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       data: user,
//       message: "User created successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from "express";
import { signupService, signinService } from "./auth.service";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await signupService(req);
    return res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
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

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
