"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Alice Johnson",
    text: "From the moment I stepped in, I felt welcomed. The staff went above and beyond to make sure I was comfortable. The rooms were spotless, and the ambiance was so relaxing. Definitely coming back!",
  },
  {
    name: "James Smith",
    text: "The breakfast was beyond amazing, and the service was top-notch. I really appreciated the fast and reliable Wi-Fi, which made it easy for me to get work done. Highly recommend!",
  },
  {
    name: "Maria Gonzales",
    text: "The decor is stunning, and the atmosphere is so peaceful. It’s the perfect spot for a weekend getaway. Everything from the bed to the food was perfect. Will definitely visit again!",
  },
  {
    name: "David Brown",
    text: "What an incredible experience! The service was professional, and the pool area was well-maintained. It truly felt like a luxury stay at an affordable price. Five stars!",
  },
  {
    name: "Sophia Wilson",
    text: "The staff was friendly, and the check-in process was smooth. I loved how quiet and cozy the rooms were. If you're looking for a peaceful retreat, this is the place!",
  },
  {
    name: "Michael Scott",
    text: "A perfect spot for business travelers. The environment is calm, the Wi-Fi is strong, and the food is excellent. I stayed for three nights and had a wonderful time. Highly recommended!",
  },
  {
    name: "Emma Davis",
    text: "The restaurant served some of the best food I’ve ever had in a hotel! The gym was also well-equipped, which was a pleasant surprise. I really enjoyed my stay.",
  },
  {
    name: "Olivia Martinez",
    text: "I was blown away by how clean and comfortable everything was. The staff made me feel like a VIP guest. I can’t wait to return for another stay.",
  },
  {
    name: "William Taylor",
    text: "The concierge service was excellent—they helped me plan my entire trip, from sightseeing to restaurant recommendations. Truly a wonderful experience!",
  },
  {
    name: "Isabella Moore",
    text: "I travel a lot, but this was by far one of the best hotel experiences I've had. The hospitality was unmatched, and the little details made a big difference. I’ll be back with my family!",
  },
  {
    name: "Ethan Anderson",
    text: "This place is a hidden gem! Everything from the service to the amenities was top-tier. The attention to detail really stood out. Highly recommend!",
  },
  {
    name: "Charlotte White",
    text: "The hotel had such a warm and inviting atmosphere. I especially loved the complimentary drinks upon arrival—such a nice touch!",
  },
  {
    name: "Benjamin Harris",
    text: "I booked this place for a relaxing weekend, and it exceeded my expectations. The spa services were fantastic, and I felt completely rejuvenated after my stay.",
  },
  {
    name: "Mia Thompson",
    text: "If you’re looking for a romantic getaway, this is the place! The ambiance was magical, and the candlelit dinner we had was unforgettable. I’ll definitely be back!",
  },
  {
    name: "Lucas Walker",
    text: "The location is perfect! It’s close to everything, yet still feels like a private retreat. I had such a peaceful and enjoyable stay.",
  },
];

const Reviews = () => {
  return (
    <div className="w-full min-h-screen bg-background  px-10 pt-10 text-foreground">
      <h1 className="800px:text-5xl text-4xl text-foreground text-center font-bold">
        Guests Say
      </h1>
      <p className="text-gray-500 text-xl tracking-wide text-center my-4 font-semibold">
        WHAT OUR CUSTOMERS SAY ABOUT US
      </p>

      <div className="px-10 flex justify-center my-10 items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 1 }, // Group 3 reviews per slide on large screens
          }}
          className="mt-8"
        >
          {Array.from(
            {
              length:
                window.innerWidth >= 1024
                  ? Math.ceil(reviews.length / 3)
                  : reviews.length,
            },
            (_, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(window.innerWidth >= 1024
                    ? reviews.slice(i * 3, i * 3 + 3)
                    : [reviews[i]]
                  ).map((review, index) => (
                    <div
                      key={index}
                      className="bg-background text-foreground shadow-lg rounded-xl p-6 w-[350px] flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300"
                    >
                      <p className="text-lg italic flex-grow">
                        "{review.text}"
                      </p>
                      <h3 className="mt-4 text-xl font-semibold text-blue-600">
                        - {review.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
