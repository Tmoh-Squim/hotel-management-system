import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";
import Buildings from "@/server/models/buildings";
import { cloudinary } from "@/server/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { productId: string } }) {
    try {
        await ConnectDB();

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
        const { productId } = params;
        if (!productId) {
            return NextResponse.json({ success: false, message: "Product ID is required!" }, { status: 400 });
        }
        const building = await Buildings.findById(productId);
        if (!building) {
            return NextResponse.json({ success: false, message: "Restaurant not found!" }, { status: 404 });
        }
        if (building.public_ids && building.public_ids.length > 0) {
            await cloudinary.api.delete_resources(building.public_ids);
        }
        await Buildings.findByIdAndDelete(productId)
        return NextResponse.json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        console.log('err',error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}
