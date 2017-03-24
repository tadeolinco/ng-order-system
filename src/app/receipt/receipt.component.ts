import { Component, OnInit } from '@angular/core';

import { Order} from '../shared/customer/order';
import { Customer } from '../shared/customer/customer';
import { CustomerService } from '../shared/customer/customer.service';

interface Receipt {
    batch: number;
    orders: {
        food: string,
        quantity: number
    }[];
}

@Component({
    selector: 'os-receipt',
    templateUrl: 'receipt.component.html'
})
export class ReceiptComponent implements OnInit {
    receipts: Receipt[] = [];
    overAllReceipt: Receipt;
    totalPrice = 0;

    constructor(private customerService: CustomerService) {
        this.overAllReceipt = {
            batch: -1,
            orders: []
        };
    }

    ngOnInit() {
        $('.ui.accordion').accordion();

        this.customerService
            .getCustomers()
            .subscribe(customers => {
                for (let customer of customers) {
                    for (let order of customer.orders) {

                        if (!this.batchExists(order.batch)) {
                            this.receipts.push({
                                batch: order.batch,
                                orders: []
                            });
                        }

                        let receipt = this.getReceipt(order.batch);
                        this.totalPrice += order.price;

                        this.insertOrder(receipt, order);
                        this.insertOrder(this.overAllReceipt, order);
                    }
                }
            });
    }

    private batchExists(batch: number): boolean {
        for (let receipt of this.receipts) {
            if (receipt.batch === batch) {
                return true;
            }
        }
        return false;
    }

    private getReceipt(batch: number): Receipt {
        for (let receipt of this.receipts) {
            if (receipt.batch === batch) {
                return receipt;
            }
        }
        return null;
    }

    private insertOrder(receipt: Receipt, order: Order) {
        let found = false;
        for (let o of receipt.orders) {
            if (o.food === order.food) {
                o.quantity += 1;
                found = true;
                break;
            }
        }

        if (!found) {
            receipt.orders.push({
                food: order.food,
                quantity: 1
            });
        }
    }

}