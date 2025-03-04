"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getUser } from "./redux/user/userReducer";
import { getRestaurants } from "./redux/admin/AdminRestaurantReducer";
import Hero from "./components/hero/Hero";
import Details from "./components/deatils/Details";
import Facilities from "./components/facilities/Facilities";
import Bed from "./components/Clean/Bed";
import Reviews from "./components/Reviews/Reviews";
import { FaArrowUp } from "react-icons/fa";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authorization_token");

      if (token && user == null) {
        dispatch(getUser(token));
      }
    }
    if (restaurants == null) {
      dispatch(getRestaurants());
    }

    // Scroll event listener
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show the button when the user has scrolled past half of the document
      if (scrollPosition > scrollHeight / 2 - windowHeight / 2) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, user, restaurants]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dvsmxvdtr/image/upload/v1739901412/roee3w3j2bq2vjoa9vtm.jpg)`,
      }}
    >
      <Hero />
      <Details />
      <Facilities />
      <Bed />
      <Reviews />
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Page;
