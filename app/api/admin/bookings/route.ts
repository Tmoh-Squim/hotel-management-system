import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";
import Bookings from "@/server/models/bookings";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await ConnectDB();

        const user = await isAuthenticated(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
        }

        if (!isAdmin(user)) {
            return NextResponse.json({ success: false, message: "Access denied!" }, { status: 403 });
        }

        const bookings = await Bookings.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            bookings,
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}
