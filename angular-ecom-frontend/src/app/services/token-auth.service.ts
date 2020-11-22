import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';   
import 'rxjs/add/operator/toPromise';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  token='';
  logged : boolean;
  loginEmitter=new Subject<boolean>();
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ this.token});
  constructor(private http : HttpClient, private base : BaseService) { }

  checkToken() : boolean{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var username = JSON.parse(localStorage.getItem('email'));
    // var password = JSON.parse(localStorage.getItem('password'));
    if(!currentUser)  
      return false;
    this.token = currentUser.token; //gets user token when user opens the app
    console.log(currentUser);
    if(username)
      username=username.email;
    // console.log(this.login);
    if(this.token=="")
      return false;
    else{
      //check if the token is valid
      this.isTokenValid(username).subscribe(data=>{
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
  isTokenValid(username){
    return this.http.get(this.base.baseurl + "/check_token/"+this.token+','+username,{ headers : this.httpHeaders});
  }
}
