import Link from "next/link";
import React from "react";
import { appBarLinks } from "../static/static";
import { AiOutlineUser } from "react-icons/ai";

const AppBar = () => {
  return (
    <div className="h-[60px] flex px-6 justify-between text-background items-center bg-blue-400 w-full">
      <div>
        <Link href={"/"} className="text-2xl font-bold cursor-pointer hover:text-foreground transition-colors duration-300 ">
          Squim's Hotel
        </Link>
      </div>

      <div className="flex gap-10 items-center font-semibold">
        {appBarLinks.map((item, index) => (
          <div key={index}>
            <Link href={item.path}>{item.title}</Link>
          </div>
        ))}
      </div>

      <div className="w-min flex items-center gap-10">
        <div className="gap-4 flex">
          <div className="px-4 py-2 bg-foreground cursor-pointer rounded-lg text-background transition-colors duration-300 hover:text-foreground hover:bg-background">
            <h1>Register</h1>
          </div>
          <div className="px-4 py-2 bg-background cursor-pointer rounded-lg text-foreground transition-colors duration-300 hover:text-background hover:bg-foreground">
            <h1>Login</h1>
          </div>
        </div>

        <AiOutlineUser size={50} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default AppBar;
