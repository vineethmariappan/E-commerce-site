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
  constructor(private api : ApiService) { }
  onCategoryChanged(event : any){
    this.category=event.target.value;
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
  }

  addProduct(){
    this.api.addOneProduct(this.product_name,this.category,this.price,this.Image).subscribe( data=>{
      console.log(data);
    }, error =>{
      console.log(error);
    } );
  }

}
