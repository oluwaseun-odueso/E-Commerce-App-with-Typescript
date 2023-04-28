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
    hashed_password: string
};

export type StoreType = {
    id: number,
    name: string,
    address: string,
    seller_id: number,
    image_key?: string
};

export type Product = {
    id: number,
    product_description: string,
    price: number,
    quantity_in_stock: number,
    store_id: number,
    seller_id: number,
    image_key: string
};

export type Order = {
    id: number,
    user_id: number,
    product_ids: number[],
    product_quantities: number[],
    price: number,
    total: number,
    payment_status: string
};

export type Payment = {
    id: number,
    user_id: number,
    order_id: number,
    reference: string,
    amount: number,
    payment_status: string
};