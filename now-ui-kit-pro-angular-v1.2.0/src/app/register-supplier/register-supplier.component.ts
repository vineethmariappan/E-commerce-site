import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.css']
})
export class RegisterSupplierComponent implements OnInit {
  repass : string;
  register = { 
    sup_email : "",
    sup_name :"",
    sup_password : "",
    sup_address : "",

  }
  constructor(private api : ApiService) { }

  ngOnInit(): void {
  }

  registerSupplier(){
    this.api.registerSupplier(this.register).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    });
  }
}
