import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  product_details;
  id : number;
  constructor(private api : ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params =>{
      this.id=params['id'];
      this.getDetails();
    });
  }

  ngOnInit(): void {
  }
  getDetails(){
    this.api.getProduct(this.id).subscribe(data =>{
      console.log(data);
      this.product_details=data;
    });
  }
}
