import { Isignin, Isignup, Iupdate } from "./auth.validaton";
import bcrypt from "bcryptjs";
import prisma from "../../utils/prisma";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail"; // Assume you have an email sending utility
import crypto from "crypto";
import { generateJWT } from "../../utils/generateJWT";

export const signupService = async (signupData: Isignup, req: any) => {
  // check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: signupData.email,
    },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(signupData.password, salt);

  // Extract IP address and user agent
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";

  // create user
  const user = await prisma.user.create({
    data: {
      ...signupData,
      password: hashedPassword,
      ipAddress,
      userAgent,
    } as any,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

// signin service
export const signinService = async (signinData: Isignin, req: any) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: signinData.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    signinData.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateJWT({ id: user.id });

  // Extract IP address and user agent (optional)
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";

  // Optionally update the last login time, IP address, and user agent
  await prisma.user.update({
    where: { id: user.id },
    data: {
      ipAddress,
      userAgent,
    },
  });

  // Return user data and token
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};

// update service

export const updateService = async (id: string, updateData: Iupdate) => {
  // Find user by ID
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // create a update token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    } as any,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    user: updatedUser,
    token,
  };
};

// delete account service
export const deleteAccountService = async (userId: string) => {
  // Find user by ID
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { id: userId },
  });
};

// chenge password service
export const changePasswordService = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the old password with the stored hashed password
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new Error("Old password is incorrect");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};

// forgot password service

export const forgotPasswordService = async (email: string) => {
  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate password reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

  // Save token to the database
  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(resetTokenExpiry),
    },
  });

  // Construct the password reset URL
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  // Send the password reset email
  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
  });
};

// src/services/auth/logoutService.ts
export const logoutService = async (req: any, res: any): Promise<void> => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict",
  });
};
