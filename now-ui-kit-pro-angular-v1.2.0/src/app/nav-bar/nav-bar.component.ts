import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  search_name : string;
  start_search(){
    this.router.navigate(['/search',this.search_name]);
  }
  log : boolean;
  isSupplier : boolean;
  constructor(private router: Router, private api : ApiService){
    
  }


  
  // Dashboard(){
    
  // }
  logout(){
    this.api.logout();
  }
  ngOnInit(): void {
    
    if(this.api.checkToken()){
      this.log=true;
      if(this.api.checkSupplier())
        this.isSupplier=true;
      else
        this.isSupplier=false;
    }
    else{
      this.log=false;
      this.isSupplier=false;
    }
    this.api.loginEmitter.subscribe(login =>{ // changes nav bar when user logs in or out
      this.log=login;
    }
    );

     this.api.isSupplierEmitter.subscribe( isSupplier =>{
      this.isSupplier=isSupplier;
    });
    
  }

}
