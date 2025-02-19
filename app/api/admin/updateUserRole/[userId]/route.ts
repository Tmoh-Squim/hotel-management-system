import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";
import Users from "@/server/models/userModel";
import { NextResponse } from "next/server";


export async function PUT(req: Request, { params }: { params: { userId: string } }) {
    try {
        await ConnectDB();
        const { role } = await req.json();
        // Authenticate user
        const user = await isAuthenticated(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
        }

        // Check if user is an admin
        if (!isAdmin(user)) {
            return NextResponse.json({ success: false, message: "Access denied!" }, { status: 403 });
        }

        // Get product ID from params
        const { userId } = params;
        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required!" }, { status: 400 });
        }
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { role: role },
            { new: true, runValidators: true }
        );
        return NextResponse.json({
            success: true,
            message: "User role updated successfully"
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}