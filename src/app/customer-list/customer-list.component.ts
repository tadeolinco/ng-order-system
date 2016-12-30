import { Component, OnInit, NgZone } from '@angular/core';

import { Customer } from '../shared/customer/customer';
import { Order } from '../shared/customer/order';

import { CustomerService } from '../shared/customer/customer.service';

@Component({
    selector: 'os-customer-list',
    templateUrl: 'customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
    originalCustomers: Customer[];
    customers: Customer[];
    options: string[];
    params: Object;
    
    constructor(private customerService: CustomerService) { 
        this.params = {
            name: '',
            food: '',
            served: 'any',
            paid: 'any',
            change: 'any'
        };
        this.options = ['any', 'yes', 'no'];
    }

    ngOnInit() { 
        this.customerService
            .getCustomers()
            .subscribe(customers => {
                this.customers = customers;
                this.originalCustomers = customers;
            });
    }

    resetParams() {
        this.params = {
            name: '',
            food: '',
            served: 'any',
            paid: 'any',
            change: 'any'
        };
        this.customers = this.originalCustomers.map(c => c);
    }

    filterCustomers() {
        let currParams = (JSON.parse(JSON.stringify(this.params)));

        setTimeout(function(currParams: Object) {
            let same = true;
            for (let key in this.params) {
                if (this.params[key] !== currParams[key]) {
                    same = false;
                    break;
                }
            }
            if (same) {
                this.customers = this.originalCustomers.filter((customer: Customer) => {
                    if (this.params.paid === 'no' && customer.paid) return false;
                    if (this.params.change === 'no' && customer.change !== 0) return false;
                    if (this.params.paid === 'yes' && !customer.paid) return false;
                    if (this.params.change === 'yes' && customer.change === 0) return false;

                    if (!customer.name.toLowerCase().includes(this.params.name.toLowerCase()))
                        return false;

                    let found = false;
                    for (let order of customer.orders) {
                        if (order.food.toLowerCase().includes(this.params.food.toLowerCase())) {
                            if (this.params.served === 'no' && order.served) continue;
                            if (this.params.served === 'yes' && !order.served) continue;
                            found = true;
                            break;
                        }
                    } 

                    if (!found) return false;
                    return true; 
                });

            }
        }.bind(this), 250, currParams);
    }

    setCustomerPaid(customer: Customer) {
        this.customerService
            .updateCustomer(customer._id, { paid: !customer.paid })
            .subscribe(newCustomer => {
                customer.paid = !newCustomer.paid;
                this.originalCustomers = this.originalCustomers.map(c => {
                    if (c._id === newCustomer._id) {
                        c.paid = !c.paid;
                    }
                    return c;
                });
            });
    }

    setCustomerChange(customer: Customer) {
        let currChange = customer.change;

        setTimeout(function() {
            if (currChange == customer.change) {
                this.customerService
                    .updateCustomer(customer._id, { change: currChange })
                    .subscribe((newCustomer: Customer) => {
                        this.originalCustomers = this.originalCustomers.map((c: Customer) => {
                            if (c._id === newCustomer._id) {
                                c.change = newCustomer.change;
                            }
                            return c;
                        })
                    });
            }
        }.bind(this), 500);
    }

    setOrderServe(customer: Customer, order: Order) {
        order.served = !order.served;
        this.customerService
            .updateCustomer(customer._id, { orders: customer.orders })
            .subscribe(customer => {
                this.originalCustomers = this.originalCustomers.map(c => {
                    c.orders = c.orders.map(o => {
                        if (o._id === order._id) {
                            o.served = order.served;
                        }
                        return o;
                    });
                    return c;
                });

            });
    }

    removeOrder(customer: Customer, order: Order) {
        this.originalCustomers = this.originalCustomers.map(c => {
            c.orders = c.orders.filter(o => {
                return o._id !== order._id;
            });
            return c;
        });

        if (customer.orders.length) {
            let body: Object = {
                orders: customer.orders
            }

            this.customerService
                .updateCustomer(customer._id, body)
                .subscribe(customer => {
                    this.customers = this.customers.map(c => {
                        c.orders = c.orders.filter(o => {
                            return o._id!== order._id;
                        });
                        return c;
                    });
                });
        
        } else {
            this.customerService
                .deleteCustomer(customer._id)
                .subscribe(() => {
                    this.originalCustomers = this.originalCustomers.filter(c => {
                        return c._id !== customer._id;
                    });
                    this.customers = this.customers.filter(c => {
                        return c._id !== customer._id;
                    })
                });
        }
    }

    computeTotalPrice(customer: Customer) {
        let totalPrice = 0;
        for (let order of customer.orders) {
            totalPrice += order.price;
        }
        return totalPrice;
    }

}