import Users from "@/server/models/studentModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { activation_token } = await req.json();

        const decodedToken = jwt.verify(activation_token, process.env.ACTIVATION_SECRET!) as JwtPayload;

        if (!decodedToken || typeof decodedToken !== "object") {
            return NextResponse.json({
                success: false,
                message: "Invalid token!",
            });
        }

        const { fullName, email, password, avatar, phoneNumber } = decodedToken as {
            fullName: string;
            email: string;
            password: string;
            avatar?: string;
            phoneNumber: string;
        };

        let user = await Users.findOne({ email });

        if (user) {
            return NextResponse.json({
                success: false,
                message: "User already exists!",
            });
        }

        user = await Users.create({
            fullName,
            email,
            avatar,
            password,
            phoneNumber,
        });

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
            user
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error!",
        });
    }
}
