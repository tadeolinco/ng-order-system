import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Order } from './order';
import { Customer } from './customer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {
    private url = 'http://localhost:3000/api/customers';

    constructor(private http: Http) { }


    getCustomers(): Observable<Customer[]> {
        return this.http
            .get(this.url)
            .map((res: Response) => {
                return res.json();
            });
    }

    createCustomer(body: Object): Observable<Customer> {
        console.log(body);
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(this.url, bodyString, options)
            .map((res: Response) => {
                return res.json();
            });
    }

    updateCustomer(id: string, body: Object): Observable<Customer> {
        return this.http
            .put(`${this.url}/${id}`, body)
            .map((res: Response) => {
                return res.json();
            });
    }

    deleteCustomer(id: string): Observable<Customer> {
        return this.http
            .delete(`${this.url}/${id}`)
            .map((res: Response) => {
                return res.json();
            });
    }
}