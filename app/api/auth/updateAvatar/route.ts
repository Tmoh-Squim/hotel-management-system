import { ConnectDB } from "@/server/config/Db";
import { isAuthenticated } from "@/server/middlewares/auth";
import Users from "@/server/models/userModel";
import { cloudinary } from "@/server/utils/cloudinary";
import { upload } from "@/server/utils/multer";
import { NextResponse } from "next/server";
import { promisify } from "util";

const uploadMiddleware = promisify(upload.single("avatar"));

export async function PUT(req: Request) {
    await uploadMiddleware(req as any, {} as any);
    await ConnectDB();
    
    const formData = await req.formData();
    const avatar = formData.get("avatar") as File;
    const user = await isAuthenticated(req);

    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
    }

    // Get the user from the database
    const existingUser = await Users.findById(user.id);
    if (!existingUser) {
        return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
    }

    // Delete the old avatar from Cloudinary if it exists
    if (existingUser.avatarPublicId) {
        await cloudinary.uploader.destroy(existingUser.avatarPublicId);
    }

    // Upload new avatar to Cloudinary
    const buffer = Buffer.from(await avatar.arrayBuffer());
    const imageUrl = await cloudinary.uploader.upload(`data:${avatar.type};base64,${buffer.toString("base64")}`);
    
    const avatarUrl = imageUrl.secure_url;
    const avatarPublicId = imageUrl.public_id;

    // Update user data in the database
    existingUser.avatar = avatarUrl;
    existingUser.avatarPublicId = avatarPublicId;
    await existingUser.save();

    return NextResponse.json({ 
        success: true, 
        message: "Avatar updated successfully!", 
        avatar: avatarUrl, 
        avatarPublicId 
    });
}
