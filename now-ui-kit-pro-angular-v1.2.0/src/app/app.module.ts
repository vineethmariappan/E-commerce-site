import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierProductsComponent } from './dashboard/supplier-products/supplier-products.component';
import { CheckOutComponent } from './viewproduct/check-out/check-out.component';
import { OrdersPlacedComponent } from './dashboard/orders-placed/orders-placed.component';
import { CartComponent } from './cart/cart.component';
import { RateProductComponent } from './viewproduct/rate-product/rate-product.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        SearchResultComponent,
        AddProductComponent,
        RegisterUserComponent,
        RegisterSupplierComponent,
        ViewproductComponent,
        UserLoginComponent,
        DashboardComponent,
        SupplierProductsComponent,
        CheckOutComponent,
        OrdersPlacedComponent,
        CartComponent,
        RateProductComponent
        
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPayPalModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
