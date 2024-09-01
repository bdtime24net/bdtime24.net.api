// utils/request.ts

import { Request } from "express";

// Utility function to get the client's IP address from the request
export const getClientIp = (req: Request): string | undefined => {
  // If using a reverse proxy like Nginx, the client IP will be in 'x-forwarded-for' header
  const xForwardedFor = req.headers["x-forwarded-for"];

  if (typeof xForwardedFor === "string") {
    return xForwardedFor.split(",")[0]; // Return the first IP address in the list
  } else if (Array.isArray(xForwardedFor)) {
    return xForwardedFor[0]; // Return the first IP address in the list
  }

  // Fallback to the direct remote address
  return req.socket.remoteAddress;
};
