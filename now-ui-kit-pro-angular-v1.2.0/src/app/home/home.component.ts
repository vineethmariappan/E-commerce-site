import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products=[{product_id : 1, prod_name : 'default', sup_id : 1, availability : 1,
  category : 1, price : 0, rating : 0 }]
  products_2=[{product_id : 1, prod_name : 'default', sup_id : 1, availability : 1,
  category : 1, price : 0, rating : 0 }]
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.getProducts("mobile");
    this.getProducts("fashion");
  }
  getProducts(category){
    this.api.getAllProducts(category).subscribe(data=>{
      if(category=="mobile")
        this.products=data;
      else if(category=="fashion")
        this.products_2=data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }
}
