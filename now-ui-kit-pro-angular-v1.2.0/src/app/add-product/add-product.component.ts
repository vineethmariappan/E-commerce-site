import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  category : string;
  product_name : string;
  price : string;
  Image : File;
  supplier_id : string;
  quantity : Number;
  constructor(private api : ApiService) { }
  onCategoryChanged(event : any){
    this.category=event.target.value;
  }
  onQuantityChanged(event : any){
    this.quantity=event.target.value;
  }
  onNameChanged(event : any){
    this.product_name=event.target.value;
  }
  onPriceChanged(event : any){
    this.price=event.target.value;
  }
  onImageChanged(event : any){
    this.Image=event.target.files[0];
  }
  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('email'));
    var email=data.email;
    var id;
    this.api.getUserDetails(email).subscribe(data=>{
      id=data.sup_id.sup_id;
      console.log("supplier id "+ data.sup_id.sup_id);
      var num=new Number(id);
      this.supplier_id=num.toString();
      console.log("getUserDetails Ends Now");
     });
  }

  addProduct(){
    var num=new Number(this.quantity);
    this.api.addOneProduct(this.product_name,this.category,this.price,this.Image,this.supplier_id,num.toString()).subscribe( data=>{
      console.log(data);

    }, error =>{
      console.log(error);
    }
     );
  }

}
