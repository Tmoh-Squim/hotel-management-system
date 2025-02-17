"use client"
import { Button, Image, Modal, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {toast} from "react-toastify"
import axios from "axios"
import { Product } from '@/app/types/types'
import { RootState } from '@/app/redux/store'
const AdminRestaurants = () => {
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const [data,setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [open,setOpen] = useState(false);
  const [id,setDeleteUser] = useState('');
  const getData = (): any[] => {
    if (!restaurants) return []; // Handle null case
    return restaurants.map((product: Product) => product); // Map safely
  }
useEffect(() => {
  setData(getData()); 
}, [restaurants]);

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
     /*  {
        title:"Id",
        key:"_id",
        dataIndex:"_id",
        render: (text) => text.slice(0, 7)+ '...'
      }, */
      {
        title: "Image",
        key: "image",
        dataIndex: "images",
        render: (images) => (
          images && images.length > 0 ? (
            <Image src={images[0]} alt="Restaurant" className='object-cover rounded-md' style={{ width: 70, height: 70 }} />
          ) : "No Image"
        )
      },
      
      {
        title:"Name",
        key:"title",
        dataIndex:"title",
        render: (text) => text.slice(0, 15)+ '...'
      },
      {
        title:"Address",
        key:"address",
        dataIndex:'address',
        render: (text) => text.slice(0, 10)+ '...'
      },
      {
        title:"Total rooms",
        key:"totalRooms",
        dataIndex:'totalRooms'
      },
      {
        title:"Created",
        key:"CreatedAt",
        dataIndex:`createdAt`,
        render: (text) => text.slice(0, 10)
      },
      {
        title:"Action",
        key:"Action",
        dataIndex:"_id",
      
        render:(id)=>(
            <div className='800px:flex items-center 800px:gap-4 gap:2'>
                <Button type='primary' className='bg-blue-400'
            onClick={()=>{
              setOpen(true);
              setDeleteUser(id)
            }}>
              Update
            </Button>
             <Button type='primary' className='w-full 800px:w-max mt-1 800px:mt-0' danger 
             onClick={()=>{
               setOpen(true);
               setDeleteUser(id)
             }}>
               Delete
             </Button>
            </div>
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

export default AdminRestaurants