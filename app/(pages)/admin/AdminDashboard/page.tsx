"use client"
import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import AdminBookings from "../AdminBookings/page";

const AdminDashboardComponent = () => {
  const { bookings } = useSelector((state: RootState) => state.bookings);

  return (
    <div className=" p-1 space-y-6">
      <h2 className="text-md text-gray-400 font-semibold">dashboard /</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 800px:gap-4 gap-2">
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <h3 className="text-lg font-medium">Total Rooms</h3>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <h3 className="text-lg font-medium">Total Bookings</h3>
          <p className="text-2xl font-bold">134</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold">Ksh 12,500</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-4 shadow-sm rounded-lg">
        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
        <AdminBookings />
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
