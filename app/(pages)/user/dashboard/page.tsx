"use client";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineDashboard,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineOrderedList,
  AiOutlineSun,
  AiOutlineUser,
} from "react-icons/ai";
import { logout } from "@/app/redux/user/userReducer";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/redux/store";

import ChangePassword from "@/app/components/ChangePassword";
import UserDashboardComponent from "../UserDashboardComponent/page";
import { getUserBookings } from "@/app/redux/user/UserBookings";
import UserBookings from "../UserBookings/page";
import UserProfile from "../Profile/page";
import { MdOutlineTrackChanges } from "react-icons/md";
import TrackOrderStatus from "../TrackOrderStatus/page";

const UserDashboard = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/")
  };
  useEffect(() => {
    if(user?.role !== "user" ||user == null){
      router.push("/Login")
    }
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
  
      if (storedToken) {
        dispatch(getUserBookings(storedToken));
      }
    }
  }, []);
  const handleThemeChange = ()=>{}
  

  const menuItems = [
    { label: "Dashboard", key: "Dashboard", icon: <AiOutlineDashboard size={20} />, component: <UserDashboardComponent /> },
    {
      label: "Bookings",
      key: "Bookings",
      icon: <AiOutlineOrderedList size={20} />, 
      component:<UserBookings/>
    },
    { label: "Track Order", key: "Track Order", icon: <MdOutlineTrackChanges size={20} />, component: <TrackOrderStatus /> },
    { label: "Profile", key: "Profile", icon: <AiOutlineUser size={20} />, component: <UserProfile /> },
    { label: "Change password", key: "Change password", icon: <AiOutlineLock size={20} />, component: <ChangePassword /> },
    { label: "Switch theme", key: "Switch theme", icon: <AiOutlineSun size={20} />,onclick:handleThemeChange },
    { label: "Logout", key: "Logout", icon: <AiOutlineLogout size={20} />, onClick: handleLogout },
  ];

  return (
    <Layout>
      <Sider theme="light" className="w-[15%] h-screen overflow-y-scroll bg-white text-black" breakpoint="lg" collapsedWidth="50px">
        <Menu
          mode="inline"
          selectedKeys={[menuItems[active]?.key]}
          onClick={({ key }) => {
            const index = menuItems.findIndex(item => item.key === key);
            if (index !== -1 && !menuItems[index].onClick) setActive(index);
            if (menuItems[index]?.onClick) menuItems[index].onClick();
          }}
          items={menuItems.map(({ onClick, ...item }) => ({
            ...item,
          }))}
          className="text-black"
        />
      </Sider>
      <Layout>
        <Content className="800px:p-5 p-1">
          {menuItems[active]?.component || <p>Select a menu item</p>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
