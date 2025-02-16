"use client";
import CustomButton from "@/app/components/CustomButton";
import CustomTextField from "@/app/components/CustomTextInput";
import { validRegex } from "@/app/types/types";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  
  const handleRegister = async () => {
    try {
      setLoading(true);
      const email = formData.email;
      const password = formData.password;
      const phone = formData.phone;
      const name = formData.name;
      if (!email || !password || !phone || !name) {
        toast.info("All fields are required")
      } else if (!email.match(validRegex)) {
        toast.info("invalid email address")
      }else if(phone.length < 10 || phone.length > 12 || isNaN(Number(phone))){
        toast.info("invalid phone number")
      }else if(password.length < 6){
        toast.info("password must be at least 6 char!")
      }
      const newUser = {
        email:email,
        password:password,
        phoneNumber:phone,
        fullName:name
      }
      const response = await axios.post('/api/auth/Signup',newUser);
      if(response.data.success){
       return toast.success(response.data.message)
      }else{
        return toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong! please try again later")
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center bg-background items-center ">
      <form className="mx-auto 800px:px-6 px-2 py-8 bg-gray-100 w-full 800px:w-[40%] rounded-lg shadow-lg text-white">
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
          <a href="/Login" className="text-blue-400 hover:underline">
            Already have an account?
          </a>
        </div>

        <div className="mt-10">
          <CustomButton
            title={"Register"}
            onClick={() => {
              handleRegister();
            }}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
