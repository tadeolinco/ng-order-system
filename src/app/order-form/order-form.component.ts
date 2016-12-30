import { Component, OnInit } from '@angular/core';

import { Customer } from '../shared/customer/customer';
import { Order } from '../shared/customer/order';
import { Menu } from '../shared/menu/menu';

import { MenuService } from '../shared/menu/menu.service';
import { CustomerService } from '../shared/customer/customer.service';

@Component({
    selector: 'os-order-form',
    templateUrl: 'order-form.component.html'
})
export class OrderFormComponent implements OnInit {
    batch = 1;
    initialized = false;
    menus: Menu[];
    customerName: string;
    customerNamePlaceholder = 'Name';
    customerOrders: Order[];
    originalMenus: Menu[];
    query: string;
    totalPrice = 0;

    constructor(
        private menuService: MenuService,
        private customerService: CustomerService
    ) { }

    ngOnInit() {
        this.menuService
            .getMenus()
            .subscribe(menus => {
                this.menus = menus;
                this.originalMenus = menus;
                this.initialized = true;
        });
        
        this.customerService
            .getCustomers()
            .subscribe(customers => {
                for (let customer of customers) {
                    for (let order of customer.orders) {
                        if (order.batch > this.batch) {
                            this.batch = order.batch;
                        }
                    }
                }
            });

        this.customerOrders = [];
    }

    changeAvailability(menu: Menu) {
        let update = { isAvailable: !menu.isAvailable };
        this.menuService
            .updateMenu(menu._id, update)
            .subscribe(newMenu => {
                for (let m of this.menus) {
                    if (m._id === newMenu._id) {
                        m.isAvailable = newMenu.isAvailable;
                    } 
                }
            });
    }

    searchMenu() {
        let currQuery = this.query;
        setTimeout(function(currQuery: string) {
            let exec: any;
            if (currQuery == this.query) {
                if (!isNaN(this.query) && this.query !== '') {
                    this.menus = this.originalMenus.filter((menu: Menu) => {
                        if (menu.price <= +this.query) 
                            return true;
                        return false;
                    });
                }
                else if (exec = /(.*)\s+-\s+(.*)/.exec(this.query)) {
                    this.menus = this.originalMenus.filter((menu: Menu) => {
                        if (menu.price <= +exec[1]
                            && menu.food.toLowerCase().includes(exec[2].toLowerCase())) 
                            return true;
                        return false;
                    });
                }
                else if (this.query.toLowerCase() === 'available') {
                    this.menus = this.originalMenus.filter((menu: Menu) => {
                        if (menu.isAvailable) return true;
                        return false;
                    });
                }
                else if (this.query.toLowerCase() === 'unavailable') {
                    this.menus = this.originalMenus.filter((menu: Menu) => {
                        if (menu.isAvailable) return false;
                        return true;
                    });
                }
                else {
                    this.menus = this.originalMenus.filter((menu: Menu) => {
                        if (menu.food.toLowerCase().includes(this.query.toLowerCase()))
                            return true;
                        return false;
                    });
                }
            }
        }.bind(this), 200, currQuery);
    }

    selectAllInput(id:string) {
        $(id).select();
    }

    nextBatch() {
        this.batch++;
    }

    resetForm() {
        this.customerName = '';
        this.customerOrders = [];
        this.totalPrice = 0;
    }

    addOrder(item: Menu) {
        let order: Order = {
            food: item.food,
            price: item.price,
            batch: this.batch,
            served: false
        }
        this.customerOrders.push(order);
        this.totalPrice += order.price;   
    }

    removeOrder(removedOrder: Order) {
        let found = false;
        this.customerOrders = this.customerOrders.filter((order: Order) => {
            if (found) return true;
            if (order === removedOrder) {
                this.totalPrice -= order.price;
                found = true;
                return false;
            }
            return true;
        });
    }

    takeOrder() {
        if (!this.customerName) {
            this.customerNamePlaceholder = 'You must enter a name!';
            return;
        }
        let body: any = { orders: this.customerOrders };

        this.customerService
            .getCustomers()
            .subscribe(customers => {
                let customer = customers.find((customer) => {
                    return customer.name.toLowerCase() === this.customerName.toLowerCase();
                });

                if (customer) {
                    body.orders = customer.orders.concat(body.orders);
                    this.customerService
                        .updateCustomer(customer._id, body)
                        .subscribe(customer => {
                            this.resetForm();
                        });

                } else {
                    body.name = this.customerName;
                    this.customerService
                        .createCustomer(body)
                        .subscribe(customer => {
                            this.resetForm();
                        });
                }
            });
    }
    
    checkNameValidity() {
        if ($('#nameInput').hasClass('ng-invalid')) {
            $('#nameInputDiv').addClass('error');
            this.customerNamePlaceholder = 'You must enter a name!';
        } else {
            $('#nameInputDiv').removeClass('error');
            this.customerNamePlaceholder = 'Name';
        }
    }
}