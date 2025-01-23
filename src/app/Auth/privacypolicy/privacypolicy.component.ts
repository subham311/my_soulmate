import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  withoutLogin_headerShow = false;
  afterLogin_headerShow = true;
  isLogin:any;

    constructor(private service:DataService) {
  this.isLogin = this.service.login();

  if(this.isLogin){
  this.afterLogin_headerShow = false;
  this.withoutLogin_headerShow = true;
  // /profile_list
  } else {
  this.afterLogin_headerShow = true;
  this.withoutLogin_headerShow = false;
  }

   }

  ngOnInit() {
  }

}
