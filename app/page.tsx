"use client";

import React, { useEffect } from "react";
import CustomButton from "./components/CustomButton";
import Link from "next/link";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getUser } from "./redux/user/userReducer";
import { getRestaurants } from "./redux/admin/AdminRestaurantReducer";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authorization_token");

      if (token) {
        dispatch(getUser(token));
      }
    }
    dispatch(getRestaurants());
  }, [dispatch]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".title",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );

    tl.fromTo(
      ".btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out", delay: 0.2 }
    );
  }, []);

  return (
    <div
      className="w-full bg-cover flex justify-center items-center h-screen object-center bg-center"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dvsmxvdtr/image/upload/v1739901412/roee3w3j2bq2vjoa9vtm.jpg)`,
      }}
    >
      <div className="text-center 800px:max-w-[38%] text-background">
        <h1 className="title 800px:text-4xl text-2xl font-bold">
          EXPERIENCE HOSPITALITY AT IT&apos;S FINEST
        </h1>
        <div className="my-4 btn w-max mx-auto">
          <Link href={"/restaurant"}>
            <CustomButton title={"Get started"} onClick={undefined} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
