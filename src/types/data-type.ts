export interface Product{
    id:number;
    title:string;
    price:number;
    thumbnail:string;
    description:string;
}

export interface ProductItemProps{
    product:Product;
}

