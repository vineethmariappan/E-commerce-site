import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
orders=[]
url;
  constructor(private route: ActivatedRoute,private api : ApiService) { }

  ngOnInit(): void {
    var email_obj=JSON.parse(localStorage.getItem('email'))
    var email=email_obj.email;
    this.url=this.api.baseurl;
    this.api.getCustomersOrders(email).subscribe(data=>{
      this.orders=data;
      console.log(data);
    });
  }
  cancelOrder(order_id){
    this.api.cancelOrder(order_id).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);
      this.ngOnInit();
    });
  }
}
