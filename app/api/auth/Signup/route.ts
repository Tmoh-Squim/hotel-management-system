import { SignUpRequestBody, validRegex } from "@/app/types/types";
import { ConnectDB } from "@/server/config/Db";
import { HashPassword } from "@/server/helpers/PasswordEncryption";
import Users from "@/server/models/studentModel";
import { NextResponse } from "next/server";


// API Route
export async function POST(req: Request) {
    try {
        const {
            email,
            fullName,
            phoneNumber,
            password,
            avatar,
        }: SignUpRequestBody = await req.json();
        await ConnectDB();
        if (!email || !fullName || !phoneNumber || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required!",
            });
        }
        if (!email.match(validRegex)) {
            return NextResponse.json({
                success: false,
                message: "invalid email address!",
            });
        }
        if (phoneNumber.length < 10 || phoneNumber.length > 12 || isNaN(Number(phoneNumber))) {
            return NextResponse.json({
                success: false,
                message: "invalid phone number!",
            });
        }
        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "password must be at least 6 char!",
            });
        }
        const existingUser = await Users.findOne({email:email});
        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "user already exists!",
            });
        }
        let hash = "";
        hash = await HashPassword(password);

        const newUser = {
            email: email,
            fullName: fullName,
            phoneNumber: phoneNumber,
            avatar: avatar,
            password: hash
        }
        const user = await Users.create(newUser);

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            message: "Something went wrong",
        });
    }
}