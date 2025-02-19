import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";
import Buildings from "@/server/models/buildings";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { productId: string } }) {
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

        // Parse the request body
        const body = await req.json();
        const { title, address, totalRooms,description,price } = body;

        // Find and update the product
        const updatedProduct = await Buildings.findByIdAndUpdate(
            productId,
            { title, address, totalRooms, description,pricePerMonth:price },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ success: false, message: "Product not found!" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
        console.log('err',error)
        return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
    }
}
