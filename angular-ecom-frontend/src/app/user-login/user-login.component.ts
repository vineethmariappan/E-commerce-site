import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenAuthService } from 'app/services/token-auth.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  login = { 
    username : "", // this thing has to be username instead of email cause its django auth's default format to get token (so we pass email with username as the key)
    password : "",

  }
 
  constructor(private api : ApiService, private router: Router, private tokenAuth : TokenAuthService) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.api.loginUser(this.login).subscribe(data=>{
      console.log(data.token);
      this.api.httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'token '+ data.token});
      localStorage.setItem('currentUser', JSON.stringify({token: data.token}));
      localStorage.setItem('email', JSON.stringify({email : this.login.username}));
      this.tokenAuth.loginEmitter.next(true);
      this.api.getUserDetails(this.login.username).subscribe(responseData  =>{
          if(responseData.is_supplier==true){
              this.api.isSupplierEmitter.next(true);
              localStorage.setItem('isSupplier', JSON.stringify({ isSupplier :  true}));
          }
          else{
            this.api.isSupplierEmitter.next(false);
            localStorage.setItem('isSupplier', JSON.stringify({ isSupplier :  false}));
          }
      });
      
      this.tokenAuth.token=data.token;
      alert("Logged in ! ")
      this.router.navigate(['/']);
    },error=>{
      console.log(error);
    });
  }

}
