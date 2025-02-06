import Link from "next/link";
import React from "react";
import { appBarLinks, authRoutes } from "../static/static";
import { AiOutlineUser } from "react-icons/ai";

const AppBar = () => {
  return (
    <div className=" py-2 flex px-6 justify-between text-background items-center bg-blue-300 w-full">
      <div>
        <Link
          href={"/"}
          className="text-2xl font-bold cursor-pointer hover:text-foreground transition-colors duration-300 "
        >
          Squim's Hotel
        </Link>
      </div>

      <div className="flex gap-10 items-center font-semibold">
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
        <div className="gap-4 flex">
          {authRoutes.map((item, index) => (
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
          ))}
        </div>

        <AiOutlineUser size={50} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default AppBar;
