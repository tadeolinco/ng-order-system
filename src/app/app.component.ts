import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <os-nav></os-nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    constructor() { }
    
    ngOnInit() { }
}