import { Order } from './order';

export interface Customer {
    _id?: string;
    name: string;
    orders: Order[];
    paid: boolean;
    change: number;    
}
