import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'app/services/supplier.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  product_details;
  id : number;
  i : number;
  star_color : string;
  product_rating : any;
  // product_rating_string : number;
  reviews = [];
  no_reviews : boolean;
  can_rate: boolean;
  total_reviews : number;
  constructor(private api : ApiService, private route: ActivatedRoute, private SupplierService : SupplierService) { 
    this.route.params.subscribe(params =>{
      this.id=params['id'];
      this.no_reviews=false;
      this.getDetails();
      
    });
  }

  ngOnInit(): void {
    this.product_rating=0;
    this.total_reviews=0;
    this.CanUserRate();
    this.getProductRating();
  }
  CanUserRate(){
    const email=this.api.getUserEmail();
    this.api.CanUserRate({'email' : email, 'product_id' :this.id}).subscribe(data=>{
      console.log(data);
      this.can_rate=true;
    },error=>{
      console.log(error);
      this.can_rate=false;
    });
  }
  getProductRating(){
    this.SupplierService.getProductRating(this.id).subscribe(data=>{
      // console.log(data);
      this.total_reviews=data.count;
      this.product_rating=data.sum_of_stars/data.count;
      if(this.product_rating>=3)
        this.star_color="#388e3c";
      else if(this.product_rating>=2)
        this.star_color="#ff9f00";
      else
        this.star_color="red";
      this.product_rating=this.product_rating.toFixed(1);
      // console.log(this.total_reviews)
    }, error=>{
      this.product_rating=0;
      this.total_reviews=0;
    });
  }
  getDetails(){
    this.api.getProduct(this.id).subscribe(data =>{
      console.log(data);
      this.api.getRating(this.id).subscribe(data =>{
        // console.log(data);
        this.reviews=data;
        for(this.i=0;this.i<this.reviews.length;this.i++){
            console.log(this.reviews[this.i].rating);
            if(this.reviews[this.i].rating>=3)
                this.reviews[this.i].color="#388e3c";
          else if(this.reviews[this.i].rating>=2)
                this.reviews[this.i].color="#ff9f00";
          else
              this.reviews[this.i].color="#ff6161";
        }
        if(this.reviews.length==0)
          this.no_reviews=true;
      })
      this.product_details=data;
    });
    
  }
}
