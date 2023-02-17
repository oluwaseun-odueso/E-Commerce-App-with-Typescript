export type User = {
    id: number,
    first_name: string, 
    last_name?: string,
    email: string,
    phone_number: string,
    address: string,
    state: string,
    postal_code?: number,
    hashed_password: string,
    image_key?: string
};

export type Seller = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    store_id?: number, 
    phone_number: string,
    address: string,
    image_key?: string,
    hashed_password: string, 
};

export type Store = {
    id: number,
    name: string,
    address: string
};

export type Product = {
    id: number,
    product_description: string,
    price: number,
    quantity_in_stock: Number
};

export type Order = {
    id: number,
    product_ids: number[],
    product_quantities: number[]
};