import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
orders=[]
url;
no_orders  : boolean;
  constructor(private route: ActivatedRoute,private api : ApiService, private base : BaseService) { 
  }

  ngOnInit(): void {
    var email_obj=JSON.parse(localStorage.getItem('email'))
    var email=email_obj.email;
    this.url=this.base.baseurl;
    this.api.getCustomersOrders(email).subscribe(data=>{
      this.orders=data;
      console.log(data);
      if(this.orders.length==0)
        this.no_orders=true;
      else
        this.no_orders=false;
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
