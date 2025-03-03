"use client";

import React, { useEffect } from "react";
import CustomButton from "./components/CustomButton";
import Link from "next/link";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getUser } from "./redux/user/userReducer";
import { getRestaurants } from "./redux/admin/AdminRestaurantReducer";
import Hero from "./components/hero/Hero";
import Details from "./components/deatils/Details";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state:RootState) => state.user);
  const {restaurants} = useSelector((state:RootState) => state.restaurants);


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
  }, [dispatch,user,restaurants]);

  return (
    <div
      className="w-full bg-cover min-h-screen object-center bg-center"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dvsmxvdtr/image/upload/v1739901412/roee3w3j2bq2vjoa9vtm.jpg)`,
      }}
    >
    <Hero />
    <Details />
    </div>
  );
};

export default Page;
