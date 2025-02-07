"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="w-full h-screen flex bg-background justify-center items-center ">
      <form className="mx-auto 800px:px-6 px-2 py-8 bg-gray-100 w-full 800px:w-[40%] rounded-lg shadow-lg text-white">
        <h1 className="text-3xl text-center font-bold mb-6 text-blue-400">
          Welcome Back!
        </h1>

        <div className="space-y-4 my-8">
          <CustomTextField
            type="email"
            placeholder="Enter your email"
            onchange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <CustomTextField
            type="password"
            placeholder="Enter your password"
            onchange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <label className="flex items-center text-blue-400 space-x-2">
            <a href="/Register" className="hover:underline">Don't have an account?</a>
          </label>
          <a href="/" className="text-blue-400 hover:underline">
            Forgot Password
          </a>
        </div>

        <div className="mt-10">
          <CustomButton />
        </div>
      </form>
    </div>
  );
};

export default Page;
