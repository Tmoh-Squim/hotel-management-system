import { ReactNode } from "react";

export interface TextInputProps {
    type:string,
    placeholder:string,
    onchange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    icon?:ReactNode,
}
export interface ButtonProps {
    title:string,
    onClick:React.MouseEventHandler<HTMLDivElement> | undefined
}

export interface Product {
    address: string;
    bedRooms: number;
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

export const validRegex =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
