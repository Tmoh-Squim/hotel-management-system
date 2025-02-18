"use client"
import { RootState } from "@/app/redux/store";
import { Product } from "@/app/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Page = () => {
  const { restaurants } = useSelector((state: RootState) => state.restaurants);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 100000,
    bedrooms: 0,
  });

  const router = useRouter();

  // Filter rooms based on selected filters
  const filteredRooms = restaurants?.filter((room: Product) => {
    const matchesLocation =
      !filters.location || room.address.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice =
      parseInt(room.pricePerMonth || room.pricePerNight) >= filters.minPrice && parseInt(room.pricePerMonth || room.pricePerNight) <= filters.maxPrice; // Convert string price to number
    const matchesBedrooms =
      filters.bedrooms === 0 || Number(room.bedrooms) === filters.bedrooms; // Convert string bedrooms to number for comparison

    return matchesLocation && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="w-full bg-background px-4 sm:px-10 py-8">
      {/* Title */}
      <h1 className="text-center text-2xl sm:text-4xl font-semibold text-foreground mb-6">
        Our Rooms
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search by location"
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <div className="flex gap-4 w-full sm:w-1/4">
          <input
            type="number"
            placeholder="Min Price"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
          value={filters.bedrooms}
          onChange={(e) =>
            setFilters({ ...filters, bedrooms: Number(e.target.value) })
          }
        >
          <option value={0}>All Bedrooms</option>
          <option value={1}>1 Bedroom</option>
          <option value={2}>2 Bedrooms</option>
          <option value={3}>3 Bedrooms</option>
        </select>
      </div>

      {/* Room Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredRooms?.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-600 w-full">
            No rooms found with the selected filters.
          </p>
        ) : (
          filteredRooms?.map((item: Product, index: number) => (
            <div
              key={index}
              onClick={() => {
                localStorage.setItem("selectedItem", JSON.stringify(item));
                router.push("/restaurantDetails");
              }}
              className="bg-background shadow-lg text-foreground cursor-pointer rounded-lg overflow-hidden transform transition-all hover:scale-105"
            >
              {/* Image */}
              <img
                src={item.images?.[0]} // Use first image if `img` is undefined
                alt={item.title}
                className="w-full h-56 object-fill"
              />
              <div className="flex justify-between items-center">
                <p className="text-gray-600 mt-2 px-4">
                  {item.bedrooms} bedrooms
                </p>
              </div>

              {/* Room Details */}
              <div className="p-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {item?.title.length > 35
                    ? item.title.slice(0, 35) + "..."
                    : item.title}
                </h2>
                <p className="text-foreground mt-2">Ksh {item.pricePerMonth || item.pricePerNight} / month</p>
              </div>
              <div className="p-2 flex items-center gap-2">
                <FaMapMarkerAlt /> <span className="text-gray-500">{item.address}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
