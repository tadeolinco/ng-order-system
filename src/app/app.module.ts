import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { NgSemanticModule } from 'ng-semantic';

import { AppComponent }   from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ReceiptComponent } from './receipt/receipt.component';

import { MenuService } from './shared/menu/menu.service';
import { CustomerService } from './shared/customer/customer.service';
 
import { CapitalizePipe } from './shared/capitalize.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgSemanticModule,
        AppRoutingModule
    ],
    exports: [],
    declarations: [
        AppComponent,
        NavComponent,
        OrderFormComponent,
        CustomerListComponent,
        ReceiptComponent,
        CapitalizePipe
    ],
    providers: [
        MenuService,
        CustomerService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
