import { seller } from "@/app/types/types";
import jwt from "jsonwebtoken";
export const createActivationToken = (user:seller) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET!, {
    expiresIn: "5m",
  });
};