import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { ConnectDB } from "@/server/config/Db";
import Users from "@/server/models/studentModel";
import { ComparePassword, HashPassword } from "@/server/helpers/PasswordEncryption";


export async function POST(req: Request) {
    try {
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                message: "All fields are required!",
            });
        }
        if(newPassword.length < 6){
            return NextResponse.json({success:false, message: 'New password must be at least 6 char!' }, { status: 401 });
        }

        // Get the authorization token from headers
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({ message: 'Authorization token not provided' }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = JWT.verify(token, process.env.JWT_SECRET!);

        // Check if the token is valid and contains the user ID
        if (!decoded || !decoded._id) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        // Connect to the database
        await ConnectDB();

        const user = await Users.findById(decoded._id);
        if (!user) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }

        const match = await ComparePassword(currentPassword, user.password);
        if (!match) {
            return NextResponse.json({
                success: false,
                message: "Old password is incorrect!",
            });
        }


        const isNewPasswordSameAsOld = await ComparePassword(newPassword, user.password);
        if (isNewPasswordSameAsOld) {
            return NextResponse.json({
                success: false,
                message: "New password can't be the same as the old password!",
            });
        }

        const hash = await HashPassword(newPassword);

        user.password = hash;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("Error updating password:", error); 
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}