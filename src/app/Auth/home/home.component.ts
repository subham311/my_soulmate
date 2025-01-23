import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { Time } from '@angular/common';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Platform } from '@angular/cdk/platform';




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

  hide = true;
  deActiveUser_Msg_Show = true;
  loginDataStore:any;
  currentUser:any;

  responsiveShowRegistra = true;


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

  currentPlatform: string = '';

  inProgressShort: boolean = true;

  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  constructor(private service: DataService, private router: Router, private msgService: MessageService, private sds:SecrectDataService, public platform: Platform) {

    this.isLogin = this.service.login();
    if (this.isLogin) {
      // this.router.navigate(['/user_dashboard']);
      this.router.navigate(['/user/profile_list']);
    } else {
      this.router.navigate(['/home']);
    }

  }

  loginForm = new FormGroup({
    login_field: new FormControl('',[Validators.required, Validators.minLength(10)]),
    password_field: new FormControl('', [Validators.required])
  });



  ngOnInit() {
    if (this.getLocalSecrectUrl?.data?.id) {
      this.router.navigate(['/profile_list']);
    }

    const isActive = this.sds.getLocalSecrectData()?.data?.isActive;

    if (isActive === 'Y') {
      this.router.navigate(['/profile_list']);
    }
    else {
      this.router.navigate(['/home']);
    }

    this.loginDataStore = {
      user_id: this.loginForm.controls.login_field.value,
      password: this.loginForm.controls.password_field.value
    }


  // setTimeout(() =>{
  // this.inProgressShort = false;
  // },3000)

  this.logout_Fnc();



  }

  logout_Fnc(){
    localStorage.clear()

    // this.router.navigate(['home']);
    
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

        // this.closebutton.nativeElement.click();

        // this.sds.setLocalSecrectData(userObj2);
        
        // this.msgService.successMsg('SS');
        
        // this.router.navigate(['/user_dashboard'])
        this.service.afterLogShowBack.next('0');

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
      

        // this.closebutton.nativeElement.click();

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

  leftNavFn(para:any){
    this.router.navigate([para])
    // this.closebutton.nativeElement.click();
  }

  alreadyMember_Res(){
    this.responsiveShowRegistra = false;
  }

  newMember(){
    this.responsiveShowRegistra = true;
  }
  

  checkPlatform(){
      if(this.platform.FIREFOX){
        this.currentPlatform = "FIREFOX";
      } else if (this.platform.isBrowser){
        this.currentPlatform = "isBrowser";
      } else if(this.platform.EDGE){
        this.currentPlatform = "EDGE";
      } else if(this.platform.IOS){
        this.currentPlatform = "IOS";
      } else if(this.platform.ANDROID){
        this.currentPlatform = "ANDROID";
      }
  }
  

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
    // this.form_user_phone_send.controls.optField.reset();
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
