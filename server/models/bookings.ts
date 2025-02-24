import mongoose, { models } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    guest: {
      type:Object
    },
    building: {
      type:Object
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    status:{
      type:String,
      default:"Processing"
    },
  },
  { timestamps: true }
);

const Bookings = models.Bookings || mongoose.model("Bookings", BookingSchema);
export default Bookings;
