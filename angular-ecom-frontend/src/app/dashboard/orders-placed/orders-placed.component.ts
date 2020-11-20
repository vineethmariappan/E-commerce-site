import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-orders-placed',
  templateUrl: './orders-placed.component.html',
  styleUrls: ['./orders-placed.component.css']
})
export class OrdersPlacedComponent implements OnInit {
  orders=[];
  url;
  constructor(private api : ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var email_obj=JSON.parse(localStorage.getItem('email'))
    var email=email_obj.email;
    this.url=this.api.baseurl;
    this.api.getOrders(email).subscribe(data=>{
      this.orders=data;
      console.log(data);
    });
  }
  confirmOrder(order_id){
    this.api.confirmOrder(order_id).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);
      this.ngOnInit();
    });
  }
  orderDelivered(order_id){
    this.api.orderDelivered(order_id).subscribe(data=>{
      console.log(data);
    }, error=>{
      console.log(error);
      this.ngOnInit();
    });
  }
  
}
