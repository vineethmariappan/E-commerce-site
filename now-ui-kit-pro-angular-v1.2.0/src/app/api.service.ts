import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl="http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http : HttpClient) { }

  getAllProducts(search_product : string): Observable<any> {
    return this.http.get(this.baseurl + "/product_detail/?search=" + search_product,
    {headers : this.httpHeaders}
    );
  }
  getProduct(id : number){
    return this.http.get(this.baseurl + "/product_detail/" + id,{ headers : this.httpHeaders});
  }
  addOneProduct(product_name : string, category : string, price : string, Image : File) : Observable<any>{
    const uploadData=new FormData();
    uploadData.append('prod_name',product_name);
    uploadData.append('availability',"1");
    uploadData.append('sup_id',"7"); // got to use serives like sessions to pass sup_id dynamically
    uploadData.append('category',category);
    uploadData.append('price',price);   
    uploadData.append('cover',Image, Image.name);   
    uploadData.append('rating',"1");   
    console.log(uploadData);
   return this.http.post(this.baseurl + '/product_detail/',uploadData);
  }
  registerUser(UserData){
    return this.http.post(this.baseurl + '/users/',UserData);
  }
  registerSupplier(SupplierData){
    return this.http.post(this.baseurl + '/users/',SupplierData);
  }
}
