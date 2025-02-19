import { NextResponse } from "next/server";
import Buildings from "@/server/models/buildings";
import { upload } from "@/server/utils/multer";
import { cloudinary } from "@/server/utils/cloudinary";
import { promisify } from "util";
import { ConnectDB } from "@/server/config/Db";
import { isAdmin, isAuthenticated } from "@/server/middlewares/auth";

// Convert Multer to Promise-based function
const uploadMiddleware = promisify(upload.array("images"));

export const POST = async (req: Request): Promise<Response> => {
    try {
        // Handle file upload using Multer
        await uploadMiddleware(req as any, {} as any);
        await ConnectDB();
        const user = await isAuthenticated(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
        }

        if (!isAdmin(user)) {
            return NextResponse.json({ success: false, message: "Access denied!" }, { status: 403 });
        }

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const bedrooms = formData.get("bedrooms") as string;
        const totalRooms = formData.get("totalRooms") as string;
        const pricePerNight = formData.get("pricePerNight") as string;
        const pricePerMonth = formData.get("pricePerMonth") as string;
        const files = formData.getAll("images") as File[];

        if (!title || !description || !address || !city) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        // Upload images to Cloudinary
        const imageUrls: string[] = [];
        const public_ids: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const result = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString("base64")}`);
            imageUrls.push(result.secure_url);
            public_ids.push(result.public_id);
        }

        const newBuilding = await Buildings.create({
            title,
            description,
            address,
            city,
            images: imageUrls,
            bedrooms,
            totalRooms,
            remainingRooms: totalRooms,
            pricePerNight,
            pricePerMonth,
            public_ids,
        });


        return NextResponse.json({ success: true, message: "Building created successfully.", building: newBuilding }, { status: 201 });
    } catch (error) {
        console.error("Error creating building:", error);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
};
