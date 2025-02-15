import Buildings from "@/server/models/buildings";
import { NextResponse } from "next/server";

export const createBuilding = async (req: Request): Promise<Response> => {
    try {
        const { title, description, address, city, images, bedrooms, totalRooms, remainingRooms, pricePerNight, pricePerMonth } = await req.json();

        // Validate required fields
        if (!title || !description || !address || !city) {
            return NextResponse.json({ message: "Missing required fields." });
        }

        const newBuilding = new Buildings({
            title,
            description,
            address,
            city,
            images: images || [],
            bedrooms,
            totalRooms,
            remainingRooms,
            pricePerNight,
            pricePerMonth,
        });

        await newBuilding.save();

        return NextResponse.json({ message: "Building created successfully.", building: newBuilding });
    } catch (error) {
        console.error("Error creating building:", error);
        return NextResponse.json({ message: "Internal server error." });
    }
};
