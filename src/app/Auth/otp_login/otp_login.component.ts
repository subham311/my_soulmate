import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { Time } from '@angular/common';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-otp_login',
  templateUrl: './otp_login.component.html',
  styleUrls: ['./otp_login.component.css']
})
export class Otp_loginComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  // @ViewChild('closebutton') closebutton: any;

  withoutLogin_headerShow = true;
  afterLogin_headerShow = true;
  isLogin:any;
  signUpMsg = true;
  hide_Send_OTP = false;
  afterSendOTP_Click = true;


  login_Data_respons:any;
  currentUser:any;
  loginDataStore:any;

  deActiveUser_Msg: any;
  deActiveUser_Msg_Show = true;

  getOPTResponse: any;
  showOtpMainBox = true;
  validMobileNum_Response: any;
  verifyBtnActive: any;
  getOTP: any;
  mobileNumber: any;
  timerInt: any;
  display_new: any;

  afterLoginMsg:any;
  // resendOTP_Desable = true;
  showExpairMsg = true;
  generateOTP_btn = true;
  otp: string;
  showOtpComponent = true;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '35px'
    }
  };

  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 

  otpFormGroup = new FormGroup({
    otp_phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });


  constructor(private service:DataService, private router: Router, private msgService: MessageService, private sds:SecrectDataService) { 
    this.isLogin = this.service.login();

    if(this.isLogin){
    this.afterLogin_headerShow = false;
    this.withoutLogin_headerShow = true;
    // /profile_list
    } else {
    this.afterLogin_headerShow = true;
    this.withoutLogin_headerShow = false;
    }

    // this.closebutton.nativeElement.click();
  }

  ngOnInit() {

    // if (localStorage.getItem("id")) {
    //   // this.router.navigate(['/user_dashboard']);
    //   this.router.navigate(['/profile_list']);
    // }

    // const isActive = localStorage.getItem('isActive');
    // if (isActive === 'Y') {
    //   // this.router.navigate(['/user_dashboard']);
    //   this.router.navigate(['/profile_list']);
    // }
    // else {
    //   this.router.navigate(['/home']);
    // }

  }


  


  // otpLogin(){

  // }



  timer_new(minute) {
    clearInterval(this.timerInt);
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    // let statSec: number = 60;
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.timerInt = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display_new = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;


      if (this.display_new == '00:00') {
        this.showExpairMsg = false;
        // this.resendOTP_Desable = false;
        clearInterval(this.timerInt);
      } else {
        this.showExpairMsg = true;
      }

    }, 1000);



  }



  resendOTP() {
    this. generateOTP();
    this.timer_new(5);
  }


  onOtpChange(otp) {
    this.otp = otp;

    if (this.otp.length == 4) {
      if (this.getOTP == this.otp) {
        this.verifyBtnActive = true;
      } else {
        this.verifyBtnActive = false;
        this.msgService.errorMsg('OTP_NOT_MAT')
      }
    } else {
      this.verifyBtnActive = false;
    }
  }

  generateOTP() {
    this.service.global_service(1, '/user/login_otp', {data: btoa(JSON.stringify(this.otpFormGroup.controls.otp_phone.value))}).subscribe((data: any) => {
      this.getOPTResponse = data;

      
      if (this.getOPTResponse.suc === 1) {

        // this.resendOTP_Desable = true;

        // this.getOTP = this.getOPTResponse.otp
        this.getOTP = this.sds.decrypt(this.getOPTResponse.otp);
      }

      if (this.getOPTResponse.suc === 2) {

        this.msgService.errorMsg('MWRNG_MOB')

      }
    })

  }

  sendOTP_login(event: any) {
    this.signUpMsg = true;
    this.deActiveUser_Msg_Show = true;

    this.mobileNumber = this.otpFormGroup.controls.otp_phone.value.length;

    // this.service.global_service(0, '/profile/check_mobile_no', `phone_no=${this.otpFormGroup.controls.otp_phone.value}`).subscribe((data: any) => {
    //   this.validMobileNum_Response = data;

      
  
  
    //   if (this.validMobileNum_Response.suc === 2) {
  


      this.service.global_service(1, '/user/login_otp', {data: btoa(JSON.stringify(this.otpFormGroup.controls.otp_phone.value))}).subscribe((data: any) => {
      var getOPTResponse = data;

      this.afterLoginMsg = data;


      if (this.afterLoginMsg.suc === 1) {
      this.deActiveUser_Msg_Show = true;

      // this.getOTP = this.afterLoginMsg.otp

      this.getOTP = this.sds.decrypt(this.afterLoginMsg.otp);

      if (this.mobileNumber == 10 && this.otpFormGroup.valid) {
      // =====================

      this.afterSendOTP_Click = false;
      this.hide_Send_OTP = true;
      this.signUpMsg = true;
      this.deActiveUser_Msg_Show = true;
      
  
      this.generateOTP_btn = false;
      this.showOtpMainBox = true;
      // this.generateOTP();
      this.timer_new(5);


      } else {
      this.generateOTP_btn = true;
      clearInterval(this.timerInt);}
      }

      if (this.afterLoginMsg.suc === 0) {
      this.deActiveUser_Msg_Show = false;
      this.signUpMsg = true;
      this.deActiveUser_Msg = this.afterLoginMsg.msg
      }

      if (this.afterLoginMsg.suc === 2) {
        this.deActiveUser_Msg_Show = true;
        this.signUpMsg = false;
        this.deActiveUser_Msg = this.afterLoginMsg.msg
        }

      })
  

  
  
      // } else if (this.validMobileNum_Response.suc === 1) {
  
      // // alert('Not Exist Number');
      // this.signUpMsg = false;
      // this.afterSendOTP_Click = true;
  
      // this.generateOTP_btn = true;
      // this.showOtpMainBox = false;
      // clearInterval(this.timerInt);
  
      // } else {
      // this.generateOTP_btn = true;
      // this.showOtpMainBox = false;
      // clearInterval(this.timerInt);
      // }
  
  
      // })




}

editeMobileNum(){
  this.afterSendOTP_Click = true;
  this.hide_Send_OTP = false;
}


// login_Fn() {

//   if (this.otp.length == 4) {
//     if (this.getOTP == this.otp) {
//       this.verifyBtnActive = true;
//       alert('Match');
//     } else {
//       this.verifyBtnActive = false;
//       alert('Not Match');
//       this.msgService.errorMsg('OTP_NOT_MAT')
      
//     }
//   } else {
//     this.verifyBtnActive = false;
//   }

// }


login_Fn(){

  this.loginDataStore = {
    user_id: this.otpFormGroup.controls.otp_phone.value,
  }

  if (this.getOTP == this.otp) {
    this.service.global_service(1, '/user/get_login_data', {data: btoa(JSON.stringify(this.loginDataStore))}).subscribe(data=>{
      this.login_Data_respons = data;
  
      
    
      if(this.login_Data_respons.suc > 0){
        // localStorage.setItem("login_success", ''+1+'');
        // localStorage.setItem("plan_id", this.login_Data_respons.user_data[0]?.plan_id);
        // localStorage.setItem("pay_name", this.login_Data_respons.user_data[0]?.pay_name);
        // localStorage.setItem("id", this.login_Data_respons.user_data[0]?.id);
        // localStorage.setItem("​​​​​​user_email", this.login_Data_respons.user_data[0]?.​​​​​​user_email);
        // localStorage.setItem("​​​user_id", this.login_Data_respons.user_data[0]?.​​​user_id);
        // localStorage.setItem("​​​user_name", this.login_Data_respons.user_data[0]?.​​​user_name);
        // localStorage.setItem("​​​profile_code", this.login_Data_respons.user_data[0]?.​​​profile_code);
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
        
        // this.msgService.successMsg('SS');
        
        this.router.navigate(['/user/profile_list'])
        // this.router.navigate(['/user_dashboard'])


        // .then(() => {
        //   window.location.reload();
        // });
        
        // this.currentUser = {
        //   login_success:localStorage.getItem("login_success"),
        //   id:localStorage.getItem("id"),
        //   ​​​user_id:localStorage.getItem("​​​user_id"),
        //   ​​​user_name:localStorage.getItem("​​​user_name")
        // }

        // this.currentUser = {
        //   login_success:this.getLocalSecrectUrl.data.login_success,
        //   id:this.getLocalSecrectUrl.data.id,
        //   ​​​user_id:this.getLocalSecrectUrl.data.​​​user_id,
        //   ​​​user_name:this.getLocalSecrectUrl.data.​​​user_name
        // }
  
        // this.closebutton.nativeElement.click();
  
      }else{
        // this.msgService.errorMsg('ES');
        // this.errorMsgLog="Your email-id or password is incorrect!"
        localStorage.setItem("login_success", ''+0+'');
      }
  
  
      });
    } else {
      this.msgService.errorMsg('OTP_NOT_MAT')
    }

  

}


nameShort(){

  const mobileNumber = this.otpFormGroup.controls.otp_phone.value;
  const firstFourNumbers = mobileNumber.slice(0, 4);
  return firstFourNumbers + 'XXXXXX';
}


}
