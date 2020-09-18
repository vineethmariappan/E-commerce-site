import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  logged : boolean;
  loginEmitter=new Subject<boolean>();
  isSupplierEmitter = new Subject<boolean>();
  baseurl="http://127.0.0.1:8000";
  token='';
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.token});
  constructor(private http : HttpClient) { 
    
    if(this.checkToken())
      this.logged=true;
    else
      this.logged=false;

    this.httpHeaders=new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.token});
  }
  getUserDetails(email : string) : Observable<any>{
    return this.http.get(this.baseurl + "/find_user/" + email); // returns user object
  }
  checkToken() : boolean{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token; //gets user token when user opens the app
    console.log(this.token);
    if(this.token=="")
      return false;
    else{
      // got to check if a valid token is present
      return true;
    }
  }
  checkSupplier() : boolean{
     var data = JSON.parse(localStorage.getItem('isSupplier'));
     var isSupplier=data.isSupplier;
     if(isSupplier)
      return true;
     return false;
  }
  logout(){
    this.loginEmitter.next(false);
    this.isSupplierEmitter.next(false);
    this.token="";
    localStorage.setItem('currentUser', JSON.stringify({ token: ""}));
    this.httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.token});
  }
  getAllProducts(search_product : string): Observable<any> {
    return this.http.get(this.baseurl + "/product_detail/?search=" + search_product,
    {headers : this.httpHeaders}
    );
  }
  getProduct(id : number){
    return this.http.get(this.baseurl + "/product_detail/" + id,{ headers : this.httpHeaders});
  }
  supplier_id : Number;
  addOneProduct(product_name : string, category : string, price : string, Image : File, supplier_id : string,availability : string) : Observable<any>{
    const uploadData=new FormData();
    uploadData.append('prod_name',product_name);
    uploadData.append('availability',"1");
      uploadData.append('sup_id',supplier_id); // got to use serives like sessions to pass sup_id dynamically
      uploadData.append('category',category);
      uploadData.append('price',price);   
      uploadData.append('cover',Image, Image.name);   
      uploadData.append('rating',"0");   
      uploadData.append('availability',availability);
     return this.http.post(this.baseurl + '/product_detail/',uploadData);
  }
  registerUser(UserData){
    return this.http.post(this.baseurl + '/users/',UserData);
  }
  registerSupplier(SupplierData){
    return this.http.post(this.baseurl + '/users/',SupplierData);
  }
  loginUser(UserData) : Observable<any>{
    return this.http.post(this.baseurl + '/auth/',UserData);
   
  }
  //for getting product list for the supplier
  getSupplierProducts(email){
    return this.http.get(this.baseurl + /supplier_products/ + email,{headers : this.httpHeaders});
  }
  // togglelogin(){
  //   this.logged=!this.logged;

  // }
}
