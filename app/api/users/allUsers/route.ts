import { ConnectDB } from "@/server/config/Db";
import Users from "@/server/models/studentModel";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await ConnectDB();
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