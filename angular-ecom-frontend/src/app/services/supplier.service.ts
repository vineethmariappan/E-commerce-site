import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';   
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';
import { TokenAuthService } from './token-auth.service';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.tokenService.token});
  constructor(private tokenService : TokenAuthService, private base : BaseService, private http : HttpClient) { }
  checkSupplier() : boolean{
    var data = JSON.parse(localStorage.getItem('isSupplier'));
    if(!data) return false;
    var isSupplier=data.isSupplier;
    if(isSupplier)
     return true;
    return false;
 }
 //for getting product list for the supplier
 getSupplierProducts(email){
  return this.http.get(this.base.baseurl + /supplier_products/ + email,{headers : this.httpHeaders});
}

deleteSupplierProduct(id){
  return this.http.delete(this.base.baseurl + /product_detail/ + id);
}
getSupplierProduct(id): Observable<any>{
  return this.http.get(this.base.baseurl + /product_detail/ + id);
}
UpdateSupplierProduct(prod_id : string,product_name : string, category : string, price : string, Image : File, supplier_id : string,availability : string,product_description : string){
  const uploadData=new FormData();
  uploadData.append('sup_id',supplier_id); 
  uploadData.append('prod_name',product_name);
    uploadData.append('category',category);
    uploadData.append('price',price); 
    uploadData.append('product_description',product_description);  
    if(typeof(Image)!="string"){ // checks if we are posting a new image, new img are representing as FILE where old imgs are representing as dest string
      // console.log(Image +" this is");
      uploadData.append('cover',Image, Image.name);   
    }
    // console.log(Image+ " "+ Image.name);
    uploadData.append('availability',availability);
  return this.http.put(this.base.baseurl + /product_detail/ + prod_id + '/',uploadData);
}
getCategories(){
  return this.http.get(this.base.baseurl + /category/,{headers : this.httpHeaders});
}
addOneProduct(product_name : string, category : string, price : string, Image : File, supplier_id : string,availability : string,product_description:string ) : Observable<any>{
  const uploadData=new FormData();
  uploadData.append('prod_name',product_name);
  // uploadData.append('availability',"1");
    uploadData.append('sup_id',supplier_id); 
    uploadData.append('category',category);
    uploadData.append('price',price);   
    uploadData.append('cover',Image, Image.name);   
    uploadData.append('rating',"0");   
    uploadData.append('product_description',product_description);   
    uploadData.append('availability',availability);
   return this.http.post(this.base.baseurl + '/product_detail/',uploadData);
}
  getProductRating(prod_id) : Observable<any>{
    return this.http.get(this.base.baseurl + /get_product_rating/+ prod_id,{headers : this.httpHeaders});
  }
}
