"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomTextInput from "./CustomTextInput";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useRouter } from "next/navigation";
import { logout } from "../redux/user/userReducer";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handlePasswordChange = async () => {
   try {
    setLoading(true);
    const token = localStorage.getItem("authorization_token")
    if(currentPassword === "" || newPassword=== ""){
      return toast.info("All fields are required")
    }else if(newPassword !== confirmPassword){
      return toast.info("New password must match!")
    }else if(newPassword.length < 6){
        return toast.info("New password must be at least 6 char!")
    }
    const response = await axios.post("/api/auth/changePassword", {
      currentPassword: currentPassword,
      newPassword: newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.success){
       toast.success(response.data.message)
       dispatch(logout());
       router.replace('/Login');
    }else{
      return toast.error( response.data.message)
    }
   } catch (error) {
    toast.error("Something went wrong .please try again later")
   }finally{
    setLoading(false);
   }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-background text-foreground p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h1>

        <div className="mb-6">
          <CustomTextInput
            placeholder="Current Password"
            type="password"
            value={currentPassword}
            onchange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <CustomTextInput
            placeholder="New Password"
            type="password"
            value={newPassword}
            onchange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <CustomTextInput
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onchange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <CustomButton
          onClick={handlePasswordChange}
          title={"Change Password"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChangePassword;