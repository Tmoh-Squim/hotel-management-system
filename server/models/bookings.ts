import mongoose, { models } from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    guest: {
      email: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
    },
    room: {
      roomNumber: {
        type: String,
        required: true,
      },
      roomType: {
        type: String,
        enum: ["single", "double", "suite", "deluxe"],
        required: true,
      },
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
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["booked", "checked-in", "checked-out", "canceled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

const Bookings = models.Bookings || mongoose.model("Bookings", BookingSchema);
export default Bookings;
