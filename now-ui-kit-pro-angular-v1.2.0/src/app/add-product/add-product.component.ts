import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ActivatedRoute } from '@angular/router';
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
  categories : any;
  product_edit_id : Number;
  isUpdate=false;
 
  constructor(private api : ApiService,  private route : ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.product_edit_id=params['product_id'];
      if(this.product_edit_id)
      this.isUpdate=true;
    });
  }

  onImageChanged(event : any){
    this.Image=event.target.files[0];
  }
  ngOnInit(): void {
    this.getCategories();

    var data = JSON.parse(localStorage.getItem('email'));
    var email=data.email;
    var id;
    this.api.getUserDetails(email).subscribe(data=>{
      id=data.sup_id.sup_id;
      var num=new Number(id);
      this.supplier_id=num.toString();
     });
    
  }
  getCategories(){
    this.api.getCategories().subscribe( responseData =>{
      console.log(responseData);
      this.category=responseData[0].category_name;
      this.categories=responseData;
      if(this.product_edit_id)
        this.getProductDetailsForUpdate(); //for update
    });
  }
  getProductDetailsForUpdate(){
      this.api.getSupplierProduct(this.product_edit_id).subscribe(responseData =>{
       this.category=responseData.category.category_name;
       this.product_name =responseData.prod_name;
       this.price =responseData.price;
       this.Image=responseData.cover;
       this.quantity=responseData.availability;
      });
  }
  reset(){ 
    this.category="";
    this.product_name="";
    this.price="";
    this.Image=null;
    this.quantity=null;
  }
  addProduct(){
    var num=new Number(this.quantity);
    if(this.isUpdate){
      var id= new Number(this.product_edit_id);
      this.api.UpdateSupplierProduct(id.toString(),this.product_name,this.category,this.price,this.Image,this.supplier_id,num.toString()).subscribe(data =>{
        console.log(data);
       alert("Product updated Successfully");

      }, error =>{
        console.log(error);
        alert("Product updated Successfully");
      });
      console.log("YES");
    }
    else{
      this.api.addOneProduct(this.product_name,this.category,this.price,this.Image,this.supplier_id,num.toString()).subscribe( data=>{
        console.log(data);
        alert(this.product_name +" added successfully");
        this.reset();
      }, error =>{
        console.log(error);
        alert(this.product_name +" added successfully");
        this.reset();
      }
      );
    }
  }
}
