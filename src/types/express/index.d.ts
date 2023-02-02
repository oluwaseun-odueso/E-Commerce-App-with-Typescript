import { User, Seller, Store, Product, Order} from "../custom";

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: User,
            seller?: Seller,
            store?: Store,
            product?: Product,
            order?: Order
        }
    }
}