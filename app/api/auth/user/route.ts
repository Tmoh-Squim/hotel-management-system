import { NextResponse } from "next/server";
import JWT from "jsonwebtoken"
import { isAuthenticated } from "@/server/middlewares/auth";
export async function GET(req: Request) {
    const user = await isAuthenticated(req);
  
    if (user instanceof Response) {
      return user;
    }
    const token = JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
  );
  
    return NextResponse.json({
      success: true,
      user,
      token
    });
  }