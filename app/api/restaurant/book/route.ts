import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { ConnectDB } from "@/server/config/Db";
import Users from "@/server/models/studentModel";
import Buildings from "@/server/models/buildings";
import Bookings from "@/server/models/bookings";
import sendMail from "@/server/utils/sendMail";

export async function POST(req:Request){
    try {
        const authHeader = req.headers.get("authorization");
        const {buildingId,checkInDate,checkOutDate} = await req.json();
        if(!checkInDate || !checkOutDate){
            return NextResponse.json({success:false, message: 'Authorization token not provided' }, { status: 401 });

        }
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
        const building = await Buildings.findById(buildingId);
        if(!building){
            return NextResponse.json({success:false, message: 'Building not found!' }, { status: 404 });
        }
        const newBooking = {
            guest:user,
            building:building,
            checkInDate:checkInDate,
            checkOutDate:checkOutDate,
            totalAmount:building.pricePerMonth
        }
        const booking = await Bookings.create(newBooking);
         await sendMail({
                  email: user.email,
                  subject: "Booking reservation",
                  message: `Hello ${user.fullName}, your reservation booking for building ${building.title} has been received and is being processed`,
                });
        return NextResponse.json({success:true, message: 'Reservation booked successfully!',booking });
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"something went wrong! try again later"
        })
    }
}