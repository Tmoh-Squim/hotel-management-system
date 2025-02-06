import { listData } from "@/app/static/static";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Page = () => {
  return (
    <div className="w-full bg-background px-4 sm:px-10 py-8">
      {/* Title */}
      <h1 className="text-center text-2xl sm:text-4xl font-bold text-foreground mb-6">
        Our Rooms
      </h1>

      {/* Room Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg cursor-pointer rounded-lg overflow-hidden transform transition-all hover:scale-105"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="flex justify-between items-center">
              <p className="text-gray-600 mt-2 px-4">
                {item.bedroom} bedrooms
              </p>
            </div>

            {/* Room Details */}
            <div className="p-2">
              <h2 className="text-xl font-semibold text-gray-800">{item?.title.length > 35 ? item.title.slice(0,35) + "..." : item.title}</h2>
              <p className="text-gray-600 mt-2">Ksh {item.price} / night</p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <FaMapMarkerAlt /> <span className="text-gray-500">{item.address}</span>
            </div>
            <div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
