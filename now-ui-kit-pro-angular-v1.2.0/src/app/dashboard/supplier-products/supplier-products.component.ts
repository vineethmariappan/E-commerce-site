import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements OnInit {
  products : any;
  url=this.api.baseurl;
  constructor(private api : ApiService) { 
    
  }
  ngOnInit(): void {
    this.getProducts();

  }
  deleteSupplierProduct(id){
    this.api.deleteSupplierProduct(id).subscribe(data =>{
      if(!data)
        this.getProducts();

    });
  }
  getProducts(){
    var data = JSON.parse(localStorage.getItem('email'));
     var email=data.email;
      this.api.getSupplierProducts(email).subscribe(data=>{
        console.log(data);
        this.products=data;
      });
  }
}
