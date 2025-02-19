"use client";
import { Button, Modal, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Booking } from "@/app/types/types";
import { RootState } from "@/app/redux/store";

const AdminBookings = () => {
  const { bookings } = useSelector((state: RootState) => state.bookings);
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [id, setDeleteUser] = useState("");

  const getData = (): any[] => {
    if (!bookings) return [];
    return bookings.map((product: Booking) => product);
  };

  useEffect(() => {
    setData(getData());
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
    }
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`/api/auth/delete-user/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Content>
      <Table
        dataSource={data}
        scroll={{ x: true }}
        columns={[
          {
            title: "Name",
            key: "guest.fullName",
            dataIndex: "guest",
            render: (guest) => guest?.fullName || "N/A",
          },
          {
            title: "Email",
            key: "guest.email",
            dataIndex: "guest",
            render: (guest) => guest?.email || "N/A",
          },
          {
            title: "Room",
            key: "building.title",
            dataIndex: "building",
            render: (building) =>
              building?.title ? building.title.slice(0, 15) + "..." : "N/A",
          },
          {
            title: "Check-in",
            key: "checkInDate",
            dataIndex: "checkInDate",
            render: (text) => text.slice(0, 10),
            filters: [
              { text: "2025", value: "2025" },
              { text: "2024", value: "2024" },
              { text: "2023", value: "2023" },
            ],
            onFilter: (value, record) =>
              record.checkInDate.includes(value as string),
          },
          {
            title: "Check-out",
            key: "checkOutDate",
            dataIndex: "checkOutDate",
            render: (text) => text.slice(0, 10),
          },
          {
            title: "Total Amount",
            key: "totalAmount",
            dataIndex: "totalAmount",
            render: (text) => `Ksh ${text}`,
            filters: [
              { text: "Above 10,000", value: "above" },
              { text: "Below 10,000", value: "below" },
            ],
            onFilter: (value, record) =>
              value === "above"
                ? record.totalAmount > 10000
                : record.totalAmount <= 10000,
          },
          {
            title: "Status",
            key: "paymentStatus",
            dataIndex: "paymentStatus",
            render: (status) => {
              let color = "";
              switch (status) {
                case "paid":
                  color = "text-green-500";
                  break;
                case "pending":
                  color = "text-black";
                  break;
                case "failed":
                  color = "text-red-500";
                  break;
                default:
                  color = "text-gray-500";
              }
              return <span className={color}>{status}</span>;
            },
            filters: [
              { text: "Paid", value: "paid" },
              { text: "Pending", value: "pending" },
              { text: "Failed", value: "failed" },
            ],
            onFilter: (value, record) => record.paymentStatus === value,
            defaultFilteredValue: ["pending"],
          },
          {
            title: "Action",
            key: "Action",
            dataIndex: "_id",
            render: (id) => (
              <div className="800px:flex items-center 800px:gap-4 gap:2">
                <Button
                  type="primary"
                  className="bg-blue-400"
                  onClick={() => {
                    setOpen(true);
                    setDeleteUser(id);
                  }}
                >
                  Update
                </Button>
              </div>
            ),
          },
        ]}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => handleDeleteUser(id)}
        title="Do you want to delete the user?"
      />
    </Content>
  );
};

export default AdminBookings;
