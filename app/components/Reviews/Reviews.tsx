"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  { name: "Alice Johnson", text: "Amazing experience! The staff was super friendly, and the rooms were spotless. Highly recommend!" },
  { name: "James Smith", text: "Great hospitality! The breakfast was delicious, and the Wi-Fi speed was excellent." },
  { name: "Maria Gonzales", text: "Loved the ambiance! Perfect place for a weekend getaway. Will definitely come back." },
  { name: "David Brown", text: "Excellent service and very comfortable rooms. The pool was a great addition!" },
  { name: "Sophia Wilson", text: "Highly professional staff, very accommodating. Enjoyed my stay!" },
  { name: "Michael Scott", text: "A peaceful and relaxing environment. Perfect for business travelers!" },
  { name: "Emma Davis", text: "The restaurant was top-notch, and the gym was well-equipped. Had a great time!" },
  { name: "Olivia Martinez", text: "Affordable luxury at its best. Everything was just perfect!" },
  { name: "William Taylor", text: "The concierge service was very helpful. Highly recommended!" },
  { name: "Isabella Moore", text: "Best hotel experience ever. Will bring my family next time!" },
  { name: "Ethan Anderson", text: "Beautiful interiors and great attention to detail. 10/10!" },
  { name: "Charlotte White", text: "Super clean, cozy, and friendly staff. Loved the complimentary drinks!" },
  { name: "Benjamin Harris", text: "Perfect place to unwind. The spa services were amazing!" },
  { name: "Mia Thompson", text: "Highly recommended for couples. Such a romantic place!" },
  { name: "Lucas Walker", text: "The location is perfect, close to everything. Amazing stay!" },
];

const Reviews = () => {
  return (
    <div className="w-full min-h-screen bg-blue-50 px-10 pt-10 text-foreground">
      <h1 className="text-5xl text-center font-bold">Guests Say</h1>
      <p className="text-gray-500 text-xl tracking-wide text-center my-4 font-semibold">
        WHAT OUR CUSTOMERS SAY ABOUT US
      </p>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true} // ❌ Turn off loop to prevent duplicate pagination
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }} // ✅ Only one set of indicators
        className="mt-8"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="bg-white shadow-md rounded-xl p-6 w-80 h-56 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300">
              <p className="text-lg italic text-gray-700">"{review.text}"</p>
              <h3 className="mt-4 text-xl font-semibold text-blue-600">
                - {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
