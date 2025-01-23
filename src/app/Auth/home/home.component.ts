import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { Time } from '@angular/common';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  store_home_user_phone: any;
  DOBList: any;
  DOBList_LocalStor: any;

  isLogin: any;
  login_Data_respons: any;

  otp: string;
  showOtpComponent = true;

  validMobileNum_Response: any;
  generateOTP_btn = true;
  numberIsExist: any;

  display: any;
  display_new: any;

  hide_Send_OTP = false;
  afterSendOTP_Click = true;

  showOtpMainBox = true;
  showExpairMsg = true;
  getOPTResponse: any;
  getOTP: any;
  mobileNumber: any;
  timerInt: any;
  // resendOTP_Desable = true;
  tiSeconds: number = 0
  tiTextSec: any = ""
  tiStatSec: number = 0
  verifyBtnActive: any;


  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '35px'
    }
  };

  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  constructor(private service: DataService, private router: Router, private msgService: MessageService, private sds:SecrectDataService) {

    this.isLogin = this.service.login();
    if (this.isLogin) {
      // this.router.navigate(['/user_dashboard']);
      this.router.navigate(['/user/profile_list']);
    } else {
      this.router.navigate(['/home']);
    }




  }



  ngOnInit() {

    if (this.getLocalSecrectUrl?.data?.id) {
      this.router.navigate(['/user/profile_list']);
    }

    const isActive = this.sds.getLocalSecrectData()?.data?.isActive;

    if (isActive === 'Y') {
      this.router.navigate(['/user/profile_list']);
    }
    else {
      this.router.navigate(['/home']);
    }

    // this.redirectToApp();

  }
  
  // isMobile(): boolean {
  //   // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //   return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // }

  // // Redirect to the Google Play Store if on mobile
  // redirectToApp(): void {
  //   if (this.isMobile()) {
  //     window.location.href = "https://play.google.com/store/apps/details?id=mysoulmate.co.in&pli=1";
  //   }
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
        this.getOTP = null;
      } else {
        this.showExpairMsg = true;
        
      }

    }, 1000);



  }



  resendOTP() {
    this.ngOtpInput.setValue('');
    this. generateOTP();
    this.timer_new(5);
  }


  onOtpChange(otp) {
    this.otp = otp;
    // console.log(this.getOTP , '==' , this.otp);
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

// SEND OTP FOR PRODUCTION //
  generateOTP() {

    this.service.global_service(1, '/profile/send_otp', { phone_no: this.form_user_phone_send.controls.home_phone.value }).subscribe((data: any) => {
      this.getOPTResponse = data;

      if (this.getOPTResponse.suc === 1) {

        // this.resendOTP_Desable = true;

        this.getOTP = this.sds.decrypt(this.getOPTResponse.otp)

        // console.log(this.getOTP, 'this.getOTP');

        
      }

      if (this.getOPTResponse.suc === 2) {

        this.msgService.errorMsg('MWRNG_MOB')

      }
    })

  }
// END //
// IGNORING OTP FOR TESTING //
  // generateOTP() {
  //       this.resendOTP_Desable = true;
  //       this.getOTP = 1234
  // }
// END //




  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }


  form_user_phone_send = new FormGroup({
    home_user: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    home_phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });



  get_form_data_home() {
    // if (this.getOTP == this.otp) {

    
    this.store_home_user_phone = {
      home_user: this.form_user_phone_send.controls.home_user.value.trim(),
      home_phone: this.form_user_phone_send.controls.home_phone.value
    }

    this.service.userName_PhoneSend.next(this.store_home_user_phone);
    if (this.getOTP == this.otp) {
    this.router.navigate(['/home/registration'])
    } else {
      this.msgService.errorMsg('OTP_NOT_MAT')
    }

  }


  enterPress_login(event: any) {


    this.mobileNumber = this.form_user_phone_send.controls.home_phone.value.length;

    if (this.mobileNumber == 10 && this.form_user_phone_send.valid && this.form_user_phone_send.controls.home_user.value.trim().length > 6) {
      this.service.global_service(0, '/profile/check_mobile_no', `phone_no=${this.form_user_phone_send.controls.home_phone.value}`).subscribe((data: any) => {
        this.validMobileNum_Response = data;


        if (this.validMobileNum_Response.suc === 2) {

          this.msgService.errorMsg('PH_EX');
          this.generateOTP_btn = true;
          this.showOtpMainBox = false;

          this.afterSendOTP_Click = true;

          clearInterval(this.timerInt);


        } else if (this.validMobileNum_Response.suc === 1) {
          this.generateOTP_btn = false;
          this.showOtpMainBox = true;

          

          this.hide_Send_OTP = true;
          this.afterSendOTP_Click = false;

          this.generateOTP();
          this.timer_new(5);
        } else {
          this.generateOTP_btn = true;
          this.showOtpMainBox = false;
          clearInterval(this.timerInt);
        }


      })
    } else {
      this.generateOTP_btn = true;
      clearInterval(this.timerInt);
    }



}

editeMobileNum(){
  this.afterSendOTP_Click = true;
  this.hide_Send_OTP = false;
}

nameShort(){

  const mobileNumber = this.form_user_phone_send.controls.home_phone.value;
  const firstFourNumbers = mobileNumber.slice(0, 4);
  return firstFourNumbers + 'XXXXXX';
}

}
