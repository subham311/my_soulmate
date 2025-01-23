import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import {MatIconModule} from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-Before_login_header_N_Home',
  templateUrl: './Before_login_header_N_Home.component.html',
  styleUrls: ['./Before_login_header_N_Home.component.css']
})
export class Before_login_header_N_HomeComponent implements OnInit {

  constructor(private service:DataService, private router:Router, private msgService: MessageService, private sds:SecrectDataService) { }
  @ViewChild('closebutton') closebutton: any;
  emailIsNotExists=false
  linkSent = false
  linkNotSent = false
  hidebtn = false

  hide = true;
  loginDataStore:any;
  login_Data_respons:any;
  errorMsgLog:any
  forgetPassData:any

  loginFormShoHid = false;
  forgetPassFormShoHid = true;
  bodyElement = document.body;
  afterLoginOffDiv:any;

  deActiveUser_Msg: any;
  deActiveUser_Msg_Show = true;
  currentUser:any;

  loginForm = new FormGroup({
    login_field: new FormControl('',[Validators.required, Validators.minLength(10)]),
    password_field: new FormControl('', [Validators.required])
  });

  forgetPass = new FormGroup({
    reg_email: new FormControl('',[Validators.email,Validators.required]),
  });

  getLocalSecrectUrl = this.sds.getLocalSecrectData(); 
  

  ngOnInit() {

  }


  leftNavFn(para:any){
    this.router.navigate([para])
    this.closebutton.nativeElement.click();
  }


  

  loginFunc(){

    this.loginDataStore = {
      user_id: this.loginForm.controls.login_field.value,
      password: this.loginForm.controls.password_field.value
    }



    // this.service.global_service(1, '/user/login_otp', {data: btoa(JSON.stringify(this.loginForm.controls.login_field.value))}).subscribe((data: any) => {

    //   // suc: 1 Active User
    //   // suc: 2 Deactive User
    //   // suc: 0 OTP Not Get User


    //   var getOPTResponse = data;

      
      
    //   if (getOPTResponse.suc === 1) {
    //     this.deActiveUser_Msg_Show = true;

    //     // ====================
    //   }

    //   if (getOPTResponse.suc === 2) {

    //     this.deActiveUser_Msg_Show = false;
    //     this.deActiveUser_Msg = 'Your account has been deactivated. Please contact with Admin'

    //   }
    // })

    this.deActiveUser_Msg_Show = true;

    this.service.global_service(1, '/user/login', {data: btoa(JSON.stringify(this.loginDataStore))}).subscribe(data=>{
      this.login_Data_respons = data;

      
    
      if(this.login_Data_respons.suc === 1){
        // localStorage.setItem("login_success", ''+1+'');
        // localStorage.setItem("plan_id", this.login_Data_respons.user_data[0].plan_id);
        // localStorage.setItem("pay_name", this.login_Data_respons.user_data[0].pay_name);
        // localStorage.setItem("id", this.login_Data_respons.user_data[0].id);
        // localStorage.setItem("​​​​​​user_email", this.login_Data_respons.user_data[0].​​​​​​user_email);
        // localStorage.setItem("​​​user_id", this.login_Data_respons.user_data[0].​​​user_id);
        // localStorage.setItem("​​​user_name", this.login_Data_respons.user_data[0].​​​user_name.trim());
        // localStorage.setItem("​​​profile_code", this.login_Data_respons.user_data[0].​​​profile_code);
        // localStorage.setItem("​​​profile_flag", this.login_Data_respons.user_data[0].profile_verify_flag ? this.login_Data_respons.user_data[0].profile_verify_flag : 'N');
       
        const {
        plan_id,
        pay_name,
        id,
        user_email,
        user_id,
        user_name,
        profile_code
        } = this.login_Data_respons.user_data[0];

        const userObj = {
        login_success:1,
        plan_id,
        pay_name,
        id,
        user_email,
        user_id,
        user_name,
        profile_code,
        profile_flag:this.login_Data_respons.user_data[0].profile_verify_flag ? this.login_Data_respons.user_data[0].profile_verify_flag : 'N'
        };

        this.sds.setLocalSecrectData(userObj);

        this.closebutton.nativeElement.click();

        // this.sds.setLocalSecrectData(userObj2);
        
        // this.msgService.successMsg('SS');
        
        // this.router.navigate(['/user_dashboard'])
        this.router.navigate(['/user/profile_list'])
        // this.router.navigate(['/privacypolicy'])

        // this.currentUser = {
        //   login_success:localStorage.getItem("login_success"),
        //   id:localStorage.getItem("id"),
        //   ​​​user_id:localStorage.getItem("​​​user_id"),
        //   ​​​user_name:localStorage.getItem("​​​user_name")
        // }


        // this.currentUser = {
        //   login_success:this.getLocalSecrectUrl?.data.login_success,
        //   id:this.getLocalSecrectUrl?.data.id,
        //   ​​​user_id:this.getLocalSecrectUrl?.data.user_id,
        //   ​​​user_name:this.getLocalSecrectUrl?.data.user_name
        // }
      

        this.closebutton.nativeElement.click();

        this.deActiveUser_Msg_Show = true;

      }

      if(this.login_Data_respons.suc === 0){
        this.deActiveUser_Msg_Show = false;

        
        // localStorage.setItem("login_success", ''+0+'');
        this.sds.setLocalSecrectData({login_success:''+0+''})

      }

      if(this.login_Data_respons.suc === 2){
        this.deActiveUser_Msg_Show = false;
        
        // localStorage.setItem("login_success", ''+0+'');

        this.sds.setLocalSecrectData({login_success:''+0+''})
        // console.log(this.sds.getLocalSecrectData().data, 'getLocalSecrectData')
      }
  
  
  
      });
    

    

  }

  logout_Fnc(){
    localStorage.clear()

    this.router.navigate(['/home']);
    
  }

  forgetPassFn() { 
    this.forgetPassData = {
      email_id: this.forgetPass.controls.reg_email.value,   
    }
    this.service.global_service(0, '/profile/check_email', `email_id=${this.forgetPass.controls.reg_email.value}`).subscribe((data:any) => {
      if(data.suc == 2)
      {
        this.service.global_service(1, '/profile/forget_email',this.forgetPassData).subscribe((data: any)=>{
          if(data.suc == 1){
            this.hidebtn = true
            this.linkSent = true
            this.linkNotSent = false
          }
          else{
            this.linkSent = false
            this.linkNotSent = true
          }
        
        })
      }
      else if(data.suc == 1){
        this.emailIsNotExists=true
      }
      else{
        this.linkSent = false
      }
      
        })
}

  showForgetPassForm(){
    this.loginFormShoHid = true;
    this.forgetPassFormShoHid = false;
  }

  showLoginForm(){
    this.loginFormShoHid = false;
    this.forgetPassFormShoHid = true;
  }

  KeepmeLog(event:any){

    if(event.target.checked == true ){
      // localStorage.setItem('isActive','Y');
      this.sds.setLocalSecrectData({isActive: 'Y'})
    }

    if(event.target.checked == false ){
      // localStorage.setItem('isActive','N');
      this.sds.setLocalSecrectData({isActive: 'N'})
    }

  }

  enterPress_login(event:any) {
    if (event.keyCode === 13) {
      this.loginFunc();
      if(this.login_Data_respons.suc != 0)
      {
        this.router.navigate(['/user_dashboard']); 
      }
      else{
        this.errorMsgLog="Your email-id or password is incorrect!"
        // localStorage.setItem("login_success", ''+0+'');
        this.sds.setLocalSecrectData({login_success: ''+0+''})
        
      } 
    }
  }

 

}
