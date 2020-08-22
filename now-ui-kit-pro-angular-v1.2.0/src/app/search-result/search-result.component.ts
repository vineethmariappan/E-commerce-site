import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
products=[{product_id : 1, prod_name : 'default', sup_id : 1, availability : 1,
category : 1, price : 0, rating : 0 }]
search_product : string;
loading : boolean;
  constructor(private api : ApiService,private route: ActivatedRoute) {
    this.loading=true;
    this.route.params.subscribe(params => {
      this.search_product = params['search_name'];
      this.getProducts();
      
    });
    
   }

  ngOnInit(): void {
  }
  getProducts(){
    this.api.getAllProducts(this.search_product).subscribe(data=>{
      this.loading=false;
      this.products=data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
