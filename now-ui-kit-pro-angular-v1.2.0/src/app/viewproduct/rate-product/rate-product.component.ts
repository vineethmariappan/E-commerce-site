import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import { defaultMaxListeners } from 'stream';

@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.component.html',
  styleUrls: ['./rate-product.component.css']
})
export class RateProductComponent implements OnInit {
desc;
head;
emptyStars=2;
rating=0;
rated=false;
id;
update=false;
product_review ={
  rating : 0,
  email : "",
  id : 0,
  review_title : "",
  review_desc : ""
}
detail = {
  email : ""
}
createRange(number){
  var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
}
star_enter(item){
  var l = document.getElementsByClassName("star_rating");
  // console.log(item);
  for(var i=0;i<item;i++){
    l[i].className = "star_rating fa fa-star fa-lg checked ";
  }
  i;
  for(i=item;i<5;i++){
    l[i].className = "star_rating fa fa-star-o fa-lg";
  }
}
star_leave(){  
  if(this.rated==true){
    this.star_enter(this.product_review.rating);
    return;
  }
  var l = document.getElementsByClassName("star_rating");
  for(var i=0;i<5;i++){
    l[i].className = "star_rating fa fa-star-o fa-lg";
  }
}
rate_product(item){
  this.rated=true;
  this.product_review.rating=item;
  console.log(this.rated);
  var l = document.getElementsByClassName("star_rating");
  for(var i=0;i<item;i++){
    l[i].className = "star_rating fa fa-star fa-lg checked ";
  }
  i;
  for(i=item;i<5;i++){
    l[i].className = "star_rating fa fa-star-o fa-lg";
  }
}
  constructor(private api : ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.product_review.id=params['id'];
      this.product_review.email=this.api.getUserEmail();
      
    });
  }
  reviews_id;
  check_if_rated(){
    var email=this.api.getUserEmail();
    this.api.check_if_rated(email).subscribe(data=>{
      if(!data[0]) return;
      this.reviews_id=data[0].reviews_id;
      this.rate_product(data[0].rating);
      this.product_review.review_title=data[0].review_title;
      this.product_review.review_desc=data[0].review_des;
      this.update=true;
    },error=>{
      console.log(error);
    })
  }
  ngOnInit(): void {
    this.check_if_rated();
  }
rate(){
  if(this.update==true){
    this.api.update_rating(this.product_review,this.reviews_id).subscribe(data=>{
      alert("rated!");
      console.log(data);
    },error=>{
      alert("rated!");
    });
    return;
  }
  this.api.rate(this.product_review).subscribe(data=>{
    alert("rated!");
    console.log(data);
  },error=>{
    alert("rated!");
  });
}
}
