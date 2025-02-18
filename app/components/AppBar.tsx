"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { appBarLinks, authRoutes } from "../static/static";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMoon,
  AiOutlineSun,
  AiOutlineUser,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const sidebarRef = useRef(null);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [open]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden h-[70px] 800px:flex px-6 justify-between text-background items-center relative z-10 bg-blue-300 shadow-lg w-full">
        <div>
          <Link
            href={"/"}
            className="text-2xl font-bold cursor-pointer hover:text-foreground transition-colors duration-300"
          >
            Squim&apos;s Hotel
          </Link>
        </div>

        <div className="flex gap-8 items-center font-semibold">
          {appBarLinks.map((item, index) => (
            <div key={index}>
              <Link
                href={item.path}
                className="text-sm relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[3px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.title.toUpperCase()}
              </Link>
            </div>
          ))}
        </div>

        <div className="w-min flex items-center gap-10">
          <div className="gap-10 flex">
            {user == null ? (
              authRoutes.map((item, index) => (
                <Link
                  href={item.route}
                  key={index}
                  className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 ${
                    item.title === "Register"
                      ? "bg-foreground text-background hover:bg-background hover:text-foreground"
                      : "bg-background text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  <h1>{item.title}</h1>
                </Link>
              ))
            ) : (
              <Link
                href={
                  user?.role === "Administrater"
                    ? "/admin/dashboard"
                    : "/user/dashboard"
                }
              >
                <div
                  className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 bg-background text-foreground hover:bg-foreground hover:text-background`}
                >
                  Dashboard
                </div>
              </Link>
            )}
          </div>

          <AiOutlineUser size={50} className="cursor-pointer hidden" />
          <div
            className="p-3 flex gap-2 items-center text-foreground cursor-pointer"
            onClick={() => {
              const newTheme = theme === "light" ? "dark" : "light";
              setTheme(newTheme);
              localStorage.setItem("theme", newTheme);
              document.documentElement.classList.replace(theme, newTheme);
            }}
          >
            {theme == "light" ? (
              <AiOutlineMoon size={35} />
            ) : (
              <AiOutlineSun size={35} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className="800px:hidden cursor-pointer bg-background text-foreground p-2 flex justify-between items-center"
        onClick={() => setOpen(true)}
      >
        <AiOutlineMenu size={30} />
        <div>
          <Link
            href={"/"}
            className="text-2xl font-bold cursor-pointer hover:text-foreground transition-colors duration-300"
          >
            Squim&apos;s Hotel
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-max py-4 w-[12rem] rounded-r-lg bg-background text-foreground shadow-lg z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex justify-end items-center p-2 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <AiOutlineClose size={28} />
        </div>

        <div className="flex flex-col gap-6 p-3 font-semibold">
          {appBarLinks.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-md hover:text-blue-500 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              {item.title.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-3 font-semibold mt-4">
          {user == null ? (
            authRoutes.map((item, index) => (
              <Link
                href={item.route}
                key={index}
                className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 ${
                  item.title === "Register"
                    ? "bg-foreground text-background hover:bg-background hover:text-foreground"
                    : "bg-background text-foreground hover:bg-foreground hover:text-background"
                }`}
                onClick={() => setOpen(false)}
              >
                <h1>{item.title}</h1>
              </Link>
            ))
          ) : (
            <Link
              href={
                user?.role === "Administrater"
                  ? "/admin/dashboard"
                  : "/user/dashboard"
              }
            >
              <div className="px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 bg-foreground text-background hover:bg-background hover:text-foreground">
                Dashboard
              </div>
            </Link>
          )}
        </div>

        <div
          className="p-3 flex gap-2 items-center text-foreground cursor-pointer"
          onClick={() => {
            const newTheme = theme === "light" ? "dark" : "light";
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.replace(theme, newTheme);
          }}
        >
          {theme == "light" ? (
            <AiOutlineMoon size={30} />
          ) : (
            <AiOutlineSun size={30} />
          )}{" "}
          <span className="text-md">Change theme</span>
        </div>
      </div>
    </>
  );
};

export default AppBar;
