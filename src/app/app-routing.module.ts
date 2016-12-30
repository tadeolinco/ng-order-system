import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
    {
        path: 'order-form',
        component: OrderFormComponent,
    },
    {
        path: 'customer-list',
        component: CustomerListComponent
    },
    {
        path: 'receipt',
        component: ReceiptComponent
    },
    {  
        path: '',
        redirectTo: '/order-form',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: OrderFormComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ 
        RouterModule
    ]
})
export class AppRoutingModule {}