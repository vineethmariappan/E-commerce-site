import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  product_details;
  id : number;
  reviews = [];
  no_reviews : boolean;
  can_rate: boolean;
  constructor(private api : ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.id=params['id'];
      this.no_reviews=false;
      this.getDetails();
    });
  }

  ngOnInit(): void {
    this.CanUserRate();
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
  getDetails(){
    this.api.getProduct(this.id).subscribe(data =>{
      console.log(data);
      this.api.getRating(this.id).subscribe(data =>{
        // console.log(data);
        this.reviews=data;
        if(this.reviews.length==0)
          this.no_reviews=true;
      })
      this.product_details=data;
    });
    
  }
}
