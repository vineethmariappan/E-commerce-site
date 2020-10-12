import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  logged : boolean;
  loginEmitter=new Subject<boolean>();
  isSupplierEmitter = new Subject<boolean>();
  baseurl="http://127.0.0.1:8000";
  token='';
username='';
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
    var username = JSON.parse(localStorage.getItem('email'));
    // var password = JSON.parse(localStorage.getItem('password'));
    if(!currentUser)  
      return false;
    this.token = currentUser.token; //gets user token when user opens the app
    console.log(currentUser);
    if(username)
    this.username=username.email;
    // console.log(this.login);
    if(this.token=="")
      return false;
    else{
      //check if the token is valid
      this.isTokenValid().subscribe(data=>{
        this.loginEmitter.next(true);
        console.log(data);
        return true;
      }, error=>{
        this.loginEmitter.next(false);
        console.log(error);
        return false;
      })
    }
  }
  isTokenValid(){
    return this.http.get(this.baseurl + "/check_token/"+this.token+','+this.username,{ headers : this.httpHeaders});
  }
  getUserEmail() : string{
    var data = JSON.parse(localStorage.getItem('email'));
    var email=data.email;
    return email;
  }
  checkSupplier() : boolean{
     var data = JSON.parse(localStorage.getItem('isSupplier'));
     if(!data) return false;
     var isSupplier=data.isSupplier;
     if(isSupplier)
      return true;
     return false;
  }
  logout(){
    this.loginEmitter.next(false);
    this.isSupplierEmitter.next(false);
    this.token="";
    localStorage.setItem('email',JSON.stringify({email : ""}));
    localStorage.setItem('currentUser', JSON.stringify({ token: ""}));
    localStorage.removeItem('isSupplier');
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
  addOneProduct(product_name : string, category : string, price : string, Image : File, supplier_id : string,availability : string,product_description:string ) : Observable<any>{
    const uploadData=new FormData();
    uploadData.append('prod_name',product_name);
    // uploadData.append('availability',"1");
      uploadData.append('sup_id',supplier_id); // got to use serives like sessions to pass sup_id dynamically
      uploadData.append('category',category);
      uploadData.append('price',price);   
      uploadData.append('cover',Image, Image.name);   
      uploadData.append('rating',"0");   
      uploadData.append('product_description',product_description);   
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

  deleteSupplierProduct(id){
    return this.http.delete(this.baseurl + /product_detail/ + id);
  }
  getSupplierProduct(id): Observable<any>{
    return this.http.get(this.baseurl + /product_detail/ + id);
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
    return this.http.put(this.baseurl + /product_detail/ + prod_id + '/',uploadData);
  }
  getCategories(){
    return this.http.get(this.baseurl + /category/,{headers : this.httpHeaders});
  }
  placeOrder(orderData): Observable<any>{
    return this.http.post(this.baseurl + /order_list/,orderData);
  }
  getOrders(email): Observable<any>{
    return this.http.get(this.baseurl + /orders_placed/ + email);
  }
  confirmOrder(order_id): Observable<any>{
      return this.http.put(this.baseurl + /confirm_order/ + order_id +'/',{headers : this.httpHeaders});
  }
  orderDelivered(order_id): Observable<any>{
    return this.http.put(this.baseurl + /order_delivered/ + order_id +'/',{headers : this.httpHeaders});
  }
  getCustomersOrders(email): Observable<any>{
    return this.http.get(this.baseurl + /orders_customer_placed/ + email);
  }
  cancelOrder(orderid){
    return this.http.put(this.baseurl + /cancel_order/ + orderid +'/',{headers : this.httpHeaders});
  }
  getRating(id): Observable<any>{
    return this.http.get(this.baseurl + /get_reviews/ + id);
  }
  rate(product_review): Observable<any>{
    return this.http.post(this.baseurl + /product_reviews/,product_review);
  }
  check_if_rated(email) : Observable<any>{
    console.log("check if rated");
    return this.http.get(this.baseurl + /get_user_review/+email);
  }
  update_rating(product_review,reviews_id) : Observable<any>{
    return this.http.put(this.baseurl +/product_reviews/+reviews_id+'/?',product_review,{headers : this.httpHeaders});
  }
}
