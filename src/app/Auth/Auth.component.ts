import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';

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
      return 'headerSec__Outer rejistrationPageLogo rejistrationPageLogo_Page';
    } else {
      return 'rejistrationPageLogo rejistrationPageLogo_Page';
    }

  }

}
