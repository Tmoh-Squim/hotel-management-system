import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})

const Users = models.Users || mongoose.model("Users",UserSchema)
export default Users