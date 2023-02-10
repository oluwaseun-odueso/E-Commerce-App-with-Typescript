export type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: number,
    hashed_password: string,
    address: string,
    state: string,
    postal_code: number
};

export type Seller = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string, 
    store_id: number, 
    phone_number: number,
    address: string
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