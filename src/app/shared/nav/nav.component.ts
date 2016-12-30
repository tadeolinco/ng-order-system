import { Component } from '@angular/core';
import { Link } from './link';

@Component({
    selector: 'os-nav',
    templateUrl: 'nav.component.html',
    styleUrls: [ 'nav.component.css' ]
})
export class NavComponent {
    links: Link[] = [
        {
            title: 'order-form',
            icon: {
                'book icon': true
            }
        },
        {
            title: 'customer-list',
            icon: {
                'users icon': true
            }
        },
        {
            title: 'receipt',
            icon: {
                'calculator icon': true
            }
        }
    ];
}