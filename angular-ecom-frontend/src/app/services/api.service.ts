import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';   
import 'rxjs/add/operator/toPromise';
import { TokenAuthService } from './token-auth.service';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isSupplierEmitter = new Subject<boolean>();
  logged : boolean;
  username='';
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.tokenService.token});
  constructor(private http : HttpClient, private tokenService : TokenAuthService, private base : BaseService) { 
    if(this.tokenService.checkToken())
      this.logged=true;
    else
      this.logged=false;

    this.httpHeaders=new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.tokenService.token});
  }
  getUserDetails(email : string) : Observable<any>{
    return this.http.get(this.base.baseurl + "/find_user/" + email); // returns user object
  }

  getUserEmail() : string{
    var data = JSON.parse(localStorage.getItem('email'));
    var email=data.email;
    return email;
  }
  
  logout(){
    this.tokenService.loginEmitter.next(false);
    this.isSupplierEmitter.next(false);
    this.tokenService.token="";
    localStorage.setItem('email',JSON.stringify({email : ""}));
    localStorage.setItem('currentUser', JSON.stringify({ token: ""}));
    localStorage.removeItem('isSupplier');
    this.httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.tokenService.token});
  }
  getAllProducts(search_product : string): Observable<any> {
    return this.http.get(this.base.baseurl + "/product_detail/?search=" + search_product,
    {headers : this.httpHeaders}
    );
  }
  getProduct(id : number){
    return this.http.get(this.base.baseurl + "/product_detail/" + id,{ headers : this.httpHeaders});
  }
  supplier_id : Number;

  registerUser(UserData){
    return this.http.post(this.base.baseurl + '/users/',UserData);
  }
  registerSupplier(SupplierData){
    return this.http.post(this.base.baseurl + '/users/',SupplierData);
  }
  loginUser(UserData) : Observable<any>{
    return this.http.post(this.base.baseurl + '/auth/',UserData);
   
  }
  
  placeOrder(orderData): Observable<any>{
    return this.http.post(this.base.baseurl + /order_list/,orderData);
  }
  getOrders(email): Observable<any>{
    return this.http.get(this.base.baseurl + /orders_placed/ + email);
  }
  confirmOrder(order_id): Observable<any>{
      return this.http.put(this.base.baseurl + /confirm_order/ + order_id +'/',{headers : this.httpHeaders});
  }
  orderDelivered(order_id): Observable<any>{
    return this.http.put(this.base.baseurl + /order_delivered/ + order_id +'/',{headers : this.httpHeaders});
  }
  getCustomersOrders(email): Observable<any>{
    return this.http.get(this.base.baseurl + /orders_customer_placed/ + email);
  }
  cancelOrder(orderid){
    return this.http.put(this.base.baseurl + /cancel_order/ + orderid +'/',{headers : this.httpHeaders});
  }
  getRating(id): Observable<any>{
    return this.http.get(this.base.baseurl + /get_reviews/ + id);
  }
  rate(product_review): Observable<any>{
    return this.http.post(this.base.baseurl + /product_reviews/,product_review);
  }
  check_if_rated(email_product) : Observable<any>{
    return this.http.post(this.base.baseurl + /get_user_review/,email_product,{headers : this.httpHeaders});
  }
  update_rating(product_review,reviews_id) : Observable<any>{
    return this.http.put(this.base.baseurl +/product_reviews/+reviews_id+'/?',product_review,{headers : this.httpHeaders});
  }
  CanUserRate(email_product): Observable<any>{
    return this.http.post(this.base.baseurl + /can_user_rate/,email_product,{headers : this.httpHeaders}); //email id of the user and the product is sent
  }
}
