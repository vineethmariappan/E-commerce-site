import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';


const routes: Routes =[
    { path: 'search/:search_name', component : SearchResultComponent },
    {path : 'addproduct', component : AddProductComponent},
    {path : 'registeruser' , component : RegisterUserComponent},
    {path : 'registersupplier' , component : RegisterSupplierComponent},
    {path : 'viewproduct/:id' , component : ViewproductComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
