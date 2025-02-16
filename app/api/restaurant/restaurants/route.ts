import { ConnectDB } from "@/server/config/Db";
import Buildings from "@/server/models/buildings";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await ConnectDB();
        const restaurants = await Buildings.find({})
        return NextResponse.json({
            success:true,
            restaurants
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"something went wrong!"
        })
    }
}