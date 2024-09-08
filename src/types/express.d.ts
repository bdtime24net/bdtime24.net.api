import { User } from "@prisma/client"; // Adjust the import path to your actual User model

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string;
      userId?: string;
      email?: string;
    }
  }
}
