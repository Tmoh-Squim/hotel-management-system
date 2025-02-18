import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { ConnectDB } from "@/server/config/Db";
import Users from "@/server/models/userModel";
import Bookings from "@/server/models/bookings";
export async function GET(req:Request){
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({success:false, message: 'Authorization token not provided' }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = JWT.verify(token, process.env.JWT_SECRET!);

        // Check if the token is valid and contains the user ID
        if (!decoded || !decoded._id) {
            return NextResponse.json({success:false, message: 'Invalid token' }, { status: 401 });
        }

        // Connect to the database
        await ConnectDB();

        const user = await Users.findById(decoded._id);
        if (!user) {
            return NextResponse.json({success:false, message: 'User not found!' }, { status: 404 });
        }
        const userBookings = await Bookings.find({"guest._id":user._id}).sort({createdAt:-1})
        return NextResponse.json({ success: true, userBookings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({success:false, message: 'something went wrong!' }, { status: 500 });
    }
}