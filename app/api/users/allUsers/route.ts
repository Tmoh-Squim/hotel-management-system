import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";
import Users from "@/server/models/userModel";
import { NextResponse } from "next/server";


export async function GET(req:Request){
    try {
        await ConnectDB();
         const user = await isAuthenticated(req);
                if (!user) {
                    return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
                }
        
                if (!isAdmin(user)) {
                    return NextResponse.json({ success: false, message: "Access denied!" }, { status: 403 });
                }
        const users = await Users.find({});

        return NextResponse.json({
            success:true,
            users:users
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong! try again later"
        })
    }
}