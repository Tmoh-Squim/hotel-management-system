import { ReactNode } from "react";

export interface TextInputProps {
    type:string,
    placeholder:string,
    onchange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    icon?:ReactNode,
    required?:boolean,
    name?:string,
    value?:string
}
export interface ButtonProps {
    title:string,
    onClick:React.MouseEventHandler<HTMLDivElement> | undefined,
    loading?: boolean
}

export interface Product {
    _id:string;
    bedrooms: string;
    pricePerMonth: string;
    address: string;
    img: string | undefined;
    title: string;
    price: number;
    bedroom: number;
    images:Array<string>;
    rating: number;
    capacity: number;
    description: string;
  }
export interface ProductProps {
    product:Product
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface SignUpRequestBody {
    email: string;
    fullName: string;
    phoneNumber: string;
    password?: string;
    avatar?: string; 
}

export interface MailProps {
    email:string,
    subject:string,
    message:string
}

export interface User {
    _id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    password: string;
    role:string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface seller {
    email: string,
    password: string,
    avatar?: string,
    fullName: string,
    phoneNumber: string,
  };
export interface Booking {
    _id:string,
    guest:User,
    building:Product,
    checkInDate:Date,
    checkOutDate:Date,
    paymentStatus:string,
    createdAt:string,
    updatedAt:string,
    totalAmount:number
}
export const validRegex =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
