import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { BaseService } from 'app/services/base.service';
import { SupplierService } from 'app/services/supplier.service';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements OnInit {
  products : any;
  url=this.base.baseurl;
  constructor(private api : ApiService, private base : BaseService,private SupplierService : SupplierService) { 
    
  }
  ngOnInit(): void {
    this.getProducts();

  }
  deleteSupplierProduct(id){
    this.SupplierService.deleteSupplierProduct(id).subscribe(data =>{
      if(!data)
        this.getProducts();

    });
  }
  getProducts(){
    var data = JSON.parse(localStorage.getItem('email'));
     var email=data.email;
      this.SupplierService.getSupplierProducts(email).subscribe(data=>{
        console.log(data);
        this.products=data;
      });
  }
}
