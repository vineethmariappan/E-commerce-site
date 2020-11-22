import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { SupplierService } from 'app/services/supplier.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  id : number;
  product_details;
  num;
  quantity: number;
  tot_price : number;
  orderData = {product_id : Number, email : String, quantity : Number};
  constructor(private api : ApiService, private route: ActivatedRoute, private SupplierService : SupplierService) { 
    this.route.params.subscribe(params =>{
      this.id=params['id'];
    });
  }

  ngOnInit(): void {
    this.quantity=1;
    this.SupplierService.getSupplierProduct(this.id).subscribe(data =>{
      this.num=new Number();
      this.product_details=data;
      console.log(this.product_details);
      // this.orderData.quantity;
      this.initConfig();
   
  });
    
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'INR',
    clientId: 'ASGsqPypnEfB4-bBt0AtzngmW8YhGgtr8bU34xQWGakzegDbvARW00eJXhRRhEeyyzYm-q8Vj96jtKBB',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'INR',
            value: this.product_details.price,
            breakdown: {
              item_total: {
                currency_code: 'INR',
                value: this.product_details.price
              }
            }
          },
          items: [
            {
              name: this.product_details.prod_name,
              quantity: '1',
              category: "DIGITAL_GOODS",
              unit_amount: {
                currency_code: 'INR',
                value: this.product_details.price,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
      size : 'small',
      color : 'blue',
      shape : 'rect'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      // this.showSuccess = true;
      this.orderData.product_id=this.product_details.product_id;
        var email_obj=JSON.parse(localStorage.getItem('email'))
        var email=email_obj.email;
        this.orderData.email=email;
        this.api.placeOrder(this.orderData).subscribe(data =>{
          console.log(data);
        });
        alert("ORDER PLACED SUCCESSFULLY");
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
