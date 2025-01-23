import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { SecrectDataService } from '../Services/SecrectData.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

    // onRightClick(event: Event): void {
  //   event.preventDefault();
  //   // You can add additional logic here if needed
  // }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentRightClick(event: Event): void {
    event.preventDefault();
  }
  
  routerUrl:any;

  // withoutLogin_headerShow = false;
  // afterLogin_headerShow = true;
  accTypeAftPay:any;

  // hideOtheres:any;
  constructor(private service:DataService, private sds:SecrectDataService) {}

  profile_UserId_new:any;
  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  isVisible:boolean

  sidebarCheck:boolean;
  pageNameCheck__:any;
  


  

  ngOnInit() {

    this.accTypeAftPay = this.getLocalSecrectUrl.data.pay_name;
    
    
    this.service.sidebar_Check.subscribe(res=>{
      this.sidebarCheck = res;
      // console.log(this.sidebarCheck , 'this.sidebarCheck ');
      
    })

    this.service.pageNameCheck.subscribe(res=>{
      // console.log(res, 'ressssssssss'); 
      this.pageNameCheck__ = res;
    })

    //  this.TestFn();

  }

  ngAfterViewInit(): void {

  }



}
