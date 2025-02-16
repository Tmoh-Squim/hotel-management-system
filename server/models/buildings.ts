import mongoose, { models } from "mongoose";

const BuildingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    images:[],
    public_ids:[],
    bedrooms:{
        type:String,
    },
    totalRooms:{
        type:String
    },
    remainingRooms:{
        type:String
    },
    pricePerNight:{
        type:String
    },
    pricePerMonth:{
        type:String
    }
},{timestamps:true})

const Buildings = models.Buildings || mongoose.model("Buildings",BuildingSchema)
export default Buildings