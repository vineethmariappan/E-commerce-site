import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router){}

  ngOnInit(): void {
  }

}
