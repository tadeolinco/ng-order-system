import Customer from '../models/customer.model';
import { Request, Response } from 'express'; 

export const getCustomers = (req: Request, res: Response) => {
    Customer.find({}, (err, customers) => {
        if (err) throw err;
        return res.json(customers);
    });
}

export const getCustomer = (req: Request, res: Response) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) throw err;
        return res.json(customer);
    });
}

export const createCustomer = (req: Request, res: Response) => {
    var newCustomer = new Customer({
        name: req.body.name,
        paid: false,
        change: 0,
        orders: req.body.orders
    });

    newCustomer.save((err, customer) => {
        if (err) throw err;
        return res.json(customer);
    });
}

export const updateCustomer = (req: Request, res: Response) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) throw err;

        customer.name = req.body.name || customer.name;
        if (typeof req.body.paid === 'boolean')
            customer.paid = req.body.paid;
        if (typeof req.body.change === 'number')
            customer.change = req.body.change;
        customer.orders = req.body.orders || customer.orders;

        customer.save((err, newCustomer) => {
            if (err) throw err;

            return res.json(newCustomer);
        });
    });
}

export const deleteCustomer = (req: Request, res: Response) => {
    Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) throw err;
        return res.json(null);
    });
}