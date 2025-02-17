"use client";

import CustomButton from "@/app/components/CustomButton";
import { Product } from "@/app/types/types";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Page = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItem = localStorage.getItem("selectedItem");
      if (storedItem) {
        const parsedProduct: Product = JSON.parse(storedItem);
        setProduct(parsedProduct);
        setImageUrl(parsedProduct.images?.[0]);
      }
    }
  }, []);

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [start, end] = update;

    if (start && end) {
      const diffTime = end.getTime() - start.getTime();
      setDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    } else {
      setDays(null);
    }
  };

  if (!product)
    return (
      <p className="text-center text-lg font-semibold mt-10 text-gray-700">
        Loading...
      </p>
    );

  return (
    <div className="mx-auto 800px:px-6 px-2 bg-background overflow-y-scroll py-4 w-full h-screen">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="block lg:w-[40%] w-full">
          <img
            src={imageUrl}
            alt={product.title}
            className="object-cover h-[260px] 800px:h-[350px] rounded-md shadow-md"
          />
          <div className="flex gap-4 my-2">
            {product.images?.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setImageUrl(item)}
              >
                <img
                  src={item}
                  alt="smallpic"
                  className="w-[65px] rounded-md object-fill h-[66px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="800pxtext-3xl text-xl font-bold text-foreground">
            {product.title}
          </h1>
          <div className="flex items-center text-gray-400 gap-2">
            <FaMapMarkerAlt />{" "}
            <span>{product.address}</span>
          </div>
          <p className="text-foreground text-lg leading-relaxed">
            {product.description}
          </p>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-green-600">
              Price: Ksh {product.pricePerMonth}
            </p>
            <p className="text-md text-yellow-500">
              ⭐ Rating: {product.rating}/5
            </p>
            <p className="text-md text-blue-500">
              🏠 Capacity: {product.bedrooms} Bedroom(s)
            </p>
          </div>

          {/* Book Reservation Button */}
          <div className="my-4 w-full lg:w-[80%]">
            <CustomButton
              title="Book reservation"
              onClick={() => setShowCalendar(true)}
            />
          </div>

          {/* Calendar Modal */}
          {showCalendar && (
            <div className="bg-background w-full ">
              <h2 className="text-xl text-foreground font-semibold mb-4 text-center">
                Select Reservation Dates
              </h2>

              {/* Single DatePicker for Range Selection */}
              <DatePicker
                selected={dateRange[0]}
                onChange={handleDateChange}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange
                minDate={new Date()} // Disable past dates
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholderText="Select date range"
                onFocus={(e) => e.target.blur()}
              />

              {/* Show Days Calculated */}
              {days !== null && (
                <p className="text-md font-semibold text-foreground mt-4">
                  Total Days: {days} day(s)
                </p>
              )}

              {/* Close Button */}
            <div className="my-2 w-max">
            <CustomButton
                onClick={() => setShowCalendar(false)}
                title="Proceed"
              />
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
