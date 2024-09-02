import jwt from "jsonwebtoken";

export const generateJWT = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    algorithm: "HS384",
    expiresIn: "7d",
    issuer: "your-issuer",
    noTimestamp: true,
    jwtid: "jwtid",
  });
};
