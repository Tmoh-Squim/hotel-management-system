export interface TextInputProps {
    type:string,
    placeholder:string,
    onchange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
export interface ButtonProps {
    title:string,
    onClick:React.MouseEventHandler<HTMLDivElement> | undefined
}

export interface Product {
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