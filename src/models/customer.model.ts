import * as mongoose from 'mongoose';

interface Order {
    food: string,
    price: number,
    batch: number,
    served: boolean
}

export interface ICustomer extends mongoose.Document {
    name: string,
    paid: boolean,
    change: number,
    orders: Order[]
}

export const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    change: {
        type: Number,
        default: 0
    },
    orders: {
        type: [{
            food: String,
            price: Number,
            batch: Number,
            served: Boolean
        }],
        default: []
    }
});

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
export default Customer;
