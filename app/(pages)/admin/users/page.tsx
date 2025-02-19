"use client";
import { Button, Modal, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { User } from "@/app/types/types";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getUsers } from "@/app/redux/admin/AdminUserReducer";
const AdminUsers = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [id, setSelectedUserId] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading,setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const getData = (): any[] => {
    if (!users) return []; // Handle null case
    return users.map((user: User) => user); // Map safely
  };
  useEffect(() => {
    setData(getData());
  }, [users]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
    }
  }, []);
  const handleUpdateUserRole = async (user:User)=>{
    try {
      setLoading(true);
      const token = localStorage.getItem("authorization_token");
      const role = user?.role === "Administrater" ? "user" : "Administrater";
      const response = await axios.put(`/api/admin/updateUserRole/${user?._id}`,{role:role},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.data.success){
        dispatch(getUsers(token));
        setUpdate(false);
        return toast.success(response.data.message);
      }
      return toast.error(response.data.message);
    } catch (error) {
      toast.error("Something went wrong! try again later")
    }finally{
      setLoading(false);
    }
  }
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
      // dispatch(deleteProducti(id,dispatch));
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
          /* {
        title:"Id",
        key:"_id",
        dataIndex:"_id",
        render: (text) => text.slice(0, 10)+ '...'
      }, */

          {
            title: "Email",
            key: "email",
            dataIndex: "email",
          },
          {
            title: "Name",
            key: "fullName",
            dataIndex: "fullName",
          },
          {
            title: "Role",
            key: "Role",
            dataIndex: "role",
          },
          {
            title: "Joined on",
            key: "CreatedAt",
            dataIndex: `createdAt`,
            render: (text) => text.slice(0, 10),
          },
          {
            title: "Action",
            key: "Action",
            dataIndex: "_id",

            render: (id, user) => (
              <div className="800px:flex items-center 800px:gap-4 gap:2">
                {user?.role !== "Administrater" ? (
                  <Button
                    type="primary"
                    className="bg-blue-400 w-full 800px:w-max"
                    onClick={() => {
                      setSelectedUser(user);
                      setUpdate(true);
                    }}
                  >
                    Promote to Admin
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className="bg-blue-400 w-full 800px:w-max"
                    onClick={() => {
                      setSelectedUser(user);
                      setUpdate(true)
                    }}
                  >
                    Demote to User
                  </Button>
                )}
                <Button
                  type="primary"
                  className="w-full 800px:w-max mt-1 800px:mt-0"
                  danger
                  onClick={() => {
                    setSelectedUserId(id);
                    setOpen(true)
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
      />
      <Modal
      open={update}
      onCancel={() => setUpdate(false)}
      onOk={() => {
        if (selectedUser) handleUpdateUserRole(selectedUser);
      }}
      confirmLoading={loading}
      title="Do you want to update the user role?"
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

export default AdminUsers;
