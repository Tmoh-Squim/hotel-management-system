  "use client"
import React, { useEffect } from "react";
import CustomButton from "./components/CustomButton";
import Link from "next/link";
import gsap from "gsap";
import { AppDispatch, store } from "./redux/store";
import { getUser } from "./redux/user/userReducer";
import { useDispatch } from "react-redux";
import { getRestaurants } from "./redux/admin/AdminRestaurantReducer";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    const token = localStorage.getItem('authorization_token');
    store.dispatch(getUser(token))
    dispatch(getRestaurants(token))
  },[store])

  useEffect(() => {
    const tl = gsap.timeline();

    // Title animation - fades in and slides up
    tl.fromTo(
      ".title",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
    // Button animation - bounce effect
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
        backgroundImage: `url(bg.jpg)`,
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
