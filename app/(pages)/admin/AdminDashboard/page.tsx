"use client"
import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import AdminBookings from "../AdminBookings/page";

const AdminDashboardComponent = () => {
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  const totalIncome = bookings?.reduce((acc, booking) => acc + (booking.totalAmount || 0), 0) || 0;


  return (
    <div className=" p-1 space-y-6">
      <h2 className="text-md text-gray-400 font-semibold">dashboard /</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 800px:gap-4 gap-2">
        <div className=" p-4 shadow-sm rounded-md">
          <h3 className="text-lg font-medium">Total Rooms</h3>
          <p className="text-2xl font-bold">{restaurants?.length}</p>
        </div>
        <div className=" p-4 shadow-sm rounded-md">
          <h3 className="text-lg font-medium">Total Bookings</h3>
          <p className="text-2xl font-bold">{bookings?.length}</p>
        </div>
        <div className=" p-4 shadow-sm rounded-md">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold">Ksh {totalIncome}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className=" p-4 shadow-sm rounded-md">
        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
        <AdminBookings />
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
