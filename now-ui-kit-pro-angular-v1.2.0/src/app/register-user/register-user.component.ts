import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
 repass : string;
  register = { 
    email : "",
    username :"",
    user_password : "",
    vinecoins: 0,
    address : "",

  }
  
  constructor(private api : ApiService) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.api.registerUser(this.register).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
