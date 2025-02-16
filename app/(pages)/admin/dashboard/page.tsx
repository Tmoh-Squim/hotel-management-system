"use client";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineLogout,
  AiOutlineOrderedList,
  AiOutlineProduct,
  AiOutlineSun,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import Page from "../../Login/page";
import { logout } from "@/app/redux/user/userReducer";
import { useRouter } from "next/navigation";
import { getUsers } from "@/app/redux/admin/AdminUserReducer";
import { AppDispatch } from "@/app/redux/store";
import AdminUsers from "../users/page";
import AdminCreateRoom from "../CreateRestaurant/page";
import AdminDashboardComponent from "../AdminDashboard/page";
import AdminRestaurants from "../AdminRestaurants/page";

const AdminDashboard = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/")
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
      dispatch(getUsers(token));
    }
  }, []);

  const menuItems = [
    { label: "Dashboard", key: "Dashboard", icon: <AiOutlineDashboard size={20} />, component: <AdminDashboardComponent /> },
    {
      label: "Bookings",
      key: "Bookings",
      icon: <AiOutlineOrderedList size={20} />, 
      children: [
        { label: "Pending Orders", key: "Pending Orders", component: <Page /> },
        { label: "Completed Orders", key: "Completed Orders", component: <Page /> },
        { label: "Refunded Orders", key: "Refunded Orders", component: <Page /> },
      ],
    },
    { label: "Rooms", key: "Rooms", icon: <AiOutlineProduct size={20} />, component: <AdminRestaurants /> },
    { label: "Add Room", key: "Add Room", icon: <AiOutlineHome size={20} />, component: <AdminCreateRoom /> },
    { label: "Categories", key: "Categories", icon: <AiOutlineProduct size={20} />, component: <Page /> },
    { label: "Add Category", key: "Add Category", icon: <AiOutlineFileAdd size={20} />, component: <Page /> },
    { label: "Users", key: "Users", icon: <AiOutlineUsergroupAdd size={20} />, component: <AdminUsers /> },
    { label: "Profile", key: "Profile", icon: <AiOutlineUser size={20} />, component: <Page /> },
    { label: "Change password", key: "Change password", icon: <AiOutlineLock size={20} />, component: <Page /> },
    { label: "Switch theme", key: "Switch theme", icon: <AiOutlineSun size={20} /> },
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
          items={menuItems.map(({ children, onClick, ...item }) => ({
            ...item,
            children: children?.map(({ label, key }) => ({ label, key })),
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

export default AdminDashboard;
