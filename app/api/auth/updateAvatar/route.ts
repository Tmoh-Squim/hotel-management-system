import { isAuthenticated } from "@/server/middlewares/auth";
import { NextResponse } from "next/server";


export async function PUT(req: Request) {
    const formData = await req.formData();
    const user = await isAuthenticated(req);
    if (!user) {
        return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
    }
    const imageUrl = "";
    

}