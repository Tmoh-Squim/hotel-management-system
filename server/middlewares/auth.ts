import { NextResponse } from "next/server";
import { ConnectDB } from "../config/Db";
import Users from "../models/studentModel";


const jwt = require("jsonwebtoken");

export const isAuthenticated = async (req: Request) => {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: 'Authorization token not provided' }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        await ConnectDB(); 

        const student = await Users.findById(decoded._id);
        if (!student) {
            return NextResponse.json({ message: 'Student not found!' }, { status: 404 });
        }

        return student; 
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};


exports.isAdmin = async(req:any,res:any,next:any)=>{
    try {
        const student = req.student;

        if(student?.role !== 'Admin'){
            return res.send({
                success:false,
                message:'unAuthorized Access!'
            })
        }else{
            next()
        }
    } catch (error) {
        return next(NextResponse.json({
            success:false,
            message:"Something went wrong"
        }))
    }
}