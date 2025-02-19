"use client"
import { Button, Image, Modal, Table, Input, Form } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import axios from "axios"
import { Product } from '@/app/types/types'
import { RootState } from '@/app/redux/store'
import TextArea from 'antd/es/input/TextArea'

const AdminRestaurants = () => {
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const getData = (): any[] => {
    if (!restaurants) return [];
    return restaurants.map((product: Product) => product);
  };

  useEffect(() => {
    setData(getData());
  }, [restaurants]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authorization_token");
      setToken(storedToken);
    }
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`/api/auth/delete-user/${id}`, {
        headers: { 'Authorization': token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setOpenDelete(false);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleUpdateProduct = async (values: Partial<Product>) => {
    if (!selectedProduct) return;
    try {
      const response = await axios.put(`/api/products/update/${selectedProduct._id}`, values, {
        headers: { 'Authorization': token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setOpenUpdate(false);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Content>
      <Table
        dataSource={data}
        scroll={{ x: true }}
        columns={[
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
            title: "Name",
            key: "title",
            dataIndex: "title",
            render: (text) => text.slice(0, 15) + '...'
          },
          {
            title: "Address",
            key: "address",
            dataIndex: 'address',
            render: (text) => text.slice(0, 10) + '...'
          },
          {
            title: "Total rooms",
            key: "totalRooms",
            dataIndex: 'totalRooms'
          },
          {
            title: "Created",
            key: "CreatedAt",
            dataIndex: `createdAt`,
            render: (text) => text.slice(0, 10)
          },
          {
            title: "Action",
            key: "Action",
            dataIndex: "_id",
            render: (id, record) => (
              <div className='800px:flex items-center 800px:gap-4 gap:2'>
                <Button
                  type='primary'
                  className='bg-blue-400'
                  onClick={() => {
                    setSelectedProduct(record);
                    form.setFieldsValue(record);
                    setOpenUpdate(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  type='primary'
                  className='w-full 800px:w-max mt-1 800px:mt-0'
                  danger
                  onClick={() => {
                    setSelectedProduct(record);
                    setOpenDelete(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            )
          }
        ]}
      />

      {/* Update Product Modal */}
      <Modal
        open={openUpdate}
        title="Update Product"
        onCancel={() => setOpenUpdate(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateProduct}>
          <Form.Item label="Name" name="title" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter the address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the address' }]}>
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item label="Total Rooms" name="totalRooms" rules={[{ required: true, message: 'Please enter total rooms' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Price" name="pricePerMonth" rules={[{ required: true, message: 'Please enter total rooms' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        onOk={() => handleDeleteUser(selectedProduct?._id || '')}
        title="Confirm Delete"
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        Are you sure you want to delete this product?
      </Modal>
    </Content>
  );
}

export default AdminRestaurants;
