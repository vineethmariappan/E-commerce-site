import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        SearchResultComponent,
        AddProductComponent,
        RegisterUserComponent,
        RegisterSupplierComponent,
        ViewproductComponent
        
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
