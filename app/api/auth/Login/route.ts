import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { ConnectDB } from "@/server/config/Db";
import { ComparePassword } from "@/server/helpers/PasswordEncryption";
import Users from "@/server/models/studentModel";
import { LoginRequestBody } from "@/app/types/types";

export async function POST(req: Request) {
    try {
        const { email, password }: LoginRequestBody = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required!"
            });
        }

        await ConnectDB();

        const user = await Users.findOne({
            email: email
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            });
        }

        const match = await ComparePassword(password, user.password);

        if (!match) {
            return NextResponse.json({
                success: false,
                message: "Invalid email"
            });
        }

        // Generate JWT token
        const token = JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return NextResponse.json({
            success: true,
            message: "Logged in successfully",
            user,
            token
        });
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
        });
    }
}