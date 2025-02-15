import React from "react";

const AdminDashboardComponent = () => {
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Guest</th>
              <th className="text-left p-2">Room</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">John Doe</td>
              <td className="p-2">Suite A</td>
              <td className="p-2">Feb 12, 2025</td>
              <td className="p-2 text-green-600">Confirmed</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">Deluxe Room</td>
              <td className="p-2">Feb 10, 2025</td>
              <td className="p-2 text-red-600">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
