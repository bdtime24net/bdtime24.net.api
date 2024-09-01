import { User } from "@prisma/client"; // Adjust the import path to your actual User model

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ensure this matches the type used everywhere in your app
    }
  }
}
