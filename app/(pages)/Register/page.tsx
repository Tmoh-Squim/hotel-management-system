"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  return (
    <div className="w-full h-screen flex justify-center bg-background items-center ">
      <form className="mx-auto 800px:px-6 px-2 py-8 bg-white w-full 800px:w-[40%] rounded-lg shadow-lg text-white">
        <h1 className="text-3xl text-center font-bold mb-6 text-blue-400">
          Create Account
        </h1>

        <div className="space-y-4 my-8">
          <CustomTextField
            type="text"
            placeholder="Enter your full name"
            onchange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <CustomTextField
            type="email"
            placeholder="Enter your email"
            onchange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <CustomTextField
            type="number"
            placeholder="Enter your phone number"
            onchange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
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

          <a href="/Login" className="text-blue-400 hover:underline">
            Already have an account?
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
