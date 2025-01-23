import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-Auth',
  templateUrl: './Auth.component.html',
  styleUrls: ['./Auth.component.css']
})
export class AuthComponent implements OnInit {

  pageNameCheck__:any;



  constructor(private service:DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.pageNameCheck.subscribe(res=>{
      this.pageNameCheck__ = res;
    })

  }

  getHeaderClass(): string {

    const currentUrl = this.router.url;
    if (currentUrl === '/home') {
      return 'headerSec__Outer';
    } else {
      return 'othersPages';
    }

  }

}
