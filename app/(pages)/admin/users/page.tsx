"use client"
import { Button, Modal, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import axios from "axios"
import { Product } from '@/app/types/types'
import { RootState } from '@/app/redux/store'
const AdminUsers = () => {
  const { users } = useSelector((state: RootState) => state.users);
  const [data,setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [open,setOpen] = useState(false);
  const [id,setDeleteUser] = useState('');
  const getData = (): any[] => {
    if (!users) return []; // Handle null case
    return users.map((product: Product) => product); // Map safely
  }
useEffect(() => {
  setData(getData()); 
}, [users]);

useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
    }
  }, []);
    const handleDeleteUser = async(id:string) =>{
    try {
      const response = await axios.delete(`/api/auth/delete-user/${id}`,{
        headers:{
          'Authorization':token
        }
      });

    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
   // dispatch(deleteProducti(id,dispatch));
    setOpen(false)
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }
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
        title:"Email",
        key:"email",
        dataIndex:"email"
      },
      {
        title:"Name",
        key:"fullName",
        dataIndex:"fullName"
      },
      {
        title:"Role",
        key:"Role",
        dataIndex:'role'
      },
      {
        title:"Joined on",
        key:"CreatedAt",
        dataIndex:`createdAt`,
        render: (text) => text.slice(0, 10)
      },
      {
        title:"Action",
        key:"Action",
        dataIndex:"_id",
      
        render:(id)=>(
            <Button type='primary' danger 
            onClick={()=>{
              setOpen(true);
              setDeleteUser(id)
            }}>
              Delete
            </Button>
        )
      }

    ]}
    />
    <Modal
    open={open}
    onCancel={()=>setOpen(false)}
    onOk={()=>handleDeleteUser(id)}
    title="Do you want to delete the user?"
     />

   </Content>
  )
}

export default AdminUsers