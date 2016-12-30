import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Menu } from './menu';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {
    private url = 'api/menus';

    constructor(private http: Http) { }

    getMenus(): Observable<Menu[]> {
        return this.http
            .get(this.url)
            .map((res: Response) => {
                return res.json();    
            });
    }

    updateMenu(id: string, body: Object): Observable<Menu> {
        return this.http
            .put(`${this.url}/${id}`, body)
            .map((res: Response) => {
                return res.json();
            });
    }
}