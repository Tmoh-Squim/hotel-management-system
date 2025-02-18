import { ConnectDB } from "@/server/config/Db";
import Bookings from "@/server/models/bookings";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await ConnectDB();
        const bookings = await Bookings.find({}).sort({createdAt:-1})
        return NextResponse.json({
            success:true,
            bookings
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"something went wrong!"
        })
    }
}