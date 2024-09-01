import { Isignin, Isignup } from "./auth.validaton";
import bcrypt from "bcryptjs";
import prisma from "../../utils/prisma";
import jwt from "jsonwebtoken";

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
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d", // 1 week
    }
  );

  // Extract IP address and user agent (optional)
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";

  // Optionally update the last login time, IP address, and user agent
  await prisma.user.update({
    where: { id: user.id },
    data: {
      createdAt: new Date(),
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
