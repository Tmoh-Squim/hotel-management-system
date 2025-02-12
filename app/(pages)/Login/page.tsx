"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import { validRegex } from "@/app/types/types";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from "react-icons/ai";
import Swal from "sweetalert2";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const handleLogin = async () => {
    try {
      const email = formData.email;
      const password = formData.password;
      if (!email || !password) {
        Swal.fire({
          title: "All fields are required",
          icon: "info",
        });
      } else if (!email.match(validRegex)) {
        Swal.fire({
          title: "invalid email address",
          icon: "info",
        });
      }
      //  const response = await axios.post("",{email,password})
    } catch (error) {
      alert("something went wrong! try again later");
    }
  };

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
            icon={
              <AiOutlineMail size={23} />
            }
          />
          <CustomTextField
            type={visible == true ? "text" : "password"}
            placeholder="Enter your password"
            icon={
              visible !== true ? (
                <AiOutlineEye size={25} onClick={() => setVisible(true)} />
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={() => setVisible(false)}
                />
              )
            }
            onchange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <label className="flex items-center text-blue-400 space-x-2">
            <a href="/Register" className="hover:underline">
              Don&apos;t have an account?
            </a>
          </label>
          <a href="/" className="text-blue-400 hover:underline">
            Forgot Password
          </a>
        </div>

        <div className="mt-10">
          <CustomButton
            title={"Login"}
            onClick={() => {
              handleLogin();
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
