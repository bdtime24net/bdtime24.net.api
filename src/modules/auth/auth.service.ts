// src/services/auth.service.ts

import prisma from "../../utils/prisma";
import { signupValidation } from "./auth.validaton";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { signinValidation } from "./auth.validaton";

export const signupService = async (req: Request) => {
  // Validate request body
  const parsedBody = signupValidation.safeParse(req.body);
  if (!parsedBody.success) {
    throw {
      status: 400,
      success: false,
      error: parsedBody.error,
    };
  }

  // Extract IP address and user agent
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedBody.data.email,
    },
  });

  if (existingUser) {
    throw { status: 400, message: "User already exists" };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(parsedBody.data.password, salt);

  // Create user in the database
  const user = await prisma.user.create({
    data: {
      ...parsedBody.data,
      password: hashedPassword,
      ipAddress,
      userAgent,
    } as any,
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const signinService = async (req: Request, res: Response) => {
  // Validate request body
  const parsedBody = signinValidation.safeParse(req.body);
  if (!parsedBody.success) {
    throw {
      status: 400,
      success: false,
      error: parsedBody.error,
    };
  }

  const { email, password } = parsedBody.data;

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw { status: 400, message: "Invalid email or password" };
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 400, message: "Invalid email or password" };
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  // Set JWT as an HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure flag for HTTPS only in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return {
    token,
  };
};
