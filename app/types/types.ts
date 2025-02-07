export interface TextInputProps {
    type:string,
    placeholder:string,
    onchange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
export interface ButtonProps {
    color:string,
}

interface Product {
    image: string;
    title: string;
    amount: number;
    rating: number;
    capacity: number;
    details: string;
  }
export interface ProductProps {
    product:Product
}