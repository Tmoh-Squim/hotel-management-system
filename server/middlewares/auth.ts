import { ConnectDB } from "../config/Db";
import Users from "../models/userModel";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req: Request) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) return null;

        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (!decoded || !decoded._id) return null;

        await ConnectDB();
        const user = await Users.findById(decoded._id);
        return user || null;
    } catch (error) {
        return null;
    }
};


export const isAdmin = (user: any) => {
    return user?.role === "Administrater";
};
