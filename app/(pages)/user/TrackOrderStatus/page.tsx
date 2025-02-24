"use client"
import { Image, Modal, Table } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Booking } from '@/app/types/types'
import { RootState } from '@/app/redux/store'
import { MdOutlineTrackChanges } from 'react-icons/md'
const TrackOrderStatus = () => {
  const { userBookings } = useSelector((state: RootState) => state.userBookings);
  const [data,setData] = useState<any[]>([]);
  const [open,setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);

  const getData = (): any[] => {
    if (!userBookings) return []; // Handle null case
    return userBookings.map((product: Booking) => product); // Map safely
  }
useEffect(() => {
  setData(getData()); 
}, [userBookings]);

  return (
   <Content>
    <Table
    dataSource={data}
    scroll={{ x: true }}
    columns={[
        {
            title: "Image",
            key: "building.images",
            dataIndex: "building",
            render: (building) =>
              building?.images?.[1] ? (
                <Image
                  src={building.images[1]}
                  alt="Building"
                  style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                "No Image"
              ),
       },          
      {
        title: "Room",
        key: "building.title",
        dataIndex: "building",
        render: (building) => (building?.title ? building.title.slice(0, 15) + "..." : "N/A"),
      },
      {
        title:"Check-in",
        key:"checkInDate",
        dataIndex:'checkInDate',
        render: (text) => text.slice(0, 10)
      },
      {
        title:"Check-out",
        key:"checkOutDate",
        dataIndex:'checkOutDate',
        render: (text) => text.slice(0, 10)
      },
      {
        title:"Total Amount",
        key:"totalAmount",
        dataIndex:`totalAmount`,
        render: (text) => `Ksh ${text}`
      },     
      {
        title:"Action",
        key:"Action",
        dataIndex:"_id",
      
        render:(id,order)=>(
            <div className='800px:flex items-center 800px:gap-4 gap:2 cursor-pointer' onClick={()=>{
                setOpen(true);
                setSelectedOrder(order)
              }}>
       
              <MdOutlineTrackChanges size={25} />
            </div>
        )
      }

    ]}
    />
    <Modal
    open={open}
    onCancel={()=>setOpen(false)}
    onOk={()=>setOpen(false)}
    title={`Your book is in ${selectedOrder?.status} stage`}
     />

   </Content>
  )
}

export default TrackOrderStatus