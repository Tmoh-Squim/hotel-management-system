import { SignUpRequestBody, validRegex } from "@/app/types/types";
import { ConnectDB } from "@/server/config/Db";
import { HashPassword } from "@/server/helpers/PasswordEncryption";
import Users from "@/server/models/studentModel";
import { createActivationToken } from "@/server/utils/activationToken";
import { sendMail } from "@/server/utils/sendMail";
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

        const activationToken = createActivationToken(newUser);
        
        const activationUrl = `https://squimhotel.vercel.app/AccountActivation/${activationToken}`;

    try {
        await sendMail({
          email: newUser.email,
          subject: "Activate your account",
          message: `Hello ${newUser.fullName}, please click on the link to activate your account: ${activationUrl}`,
        });
        return NextResponse.json({
            success: true,
            message: `please check your email:- ${newUser.email} to activate your account!`,
        });
      } catch (error) {
        return NextResponse.json({
            success: false,
            message: `please check your internet connection and try again!`,
        });
      }

       /*  const user = await Users.create(newUser);

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
            user: user,
        }); */
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            message: "Something went wrong",
        });
    }
}