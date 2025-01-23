import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passData:any
  withoutLogin_headerShow = false;
  afterLogin_headerShow = true;
  isLogin:any;
  errorPass:any;
  isButtonDisabled = false;
  linkExpired= false
  
  constructor(private service:DataService, private router:Router, private route: ActivatedRoute, private sds:SecrectDataService) {
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
   hide_old = true;
   hide_new = true;
   hide_con = true;

   
   
   passwordForm = new FormGroup({
    new_pass_1: new FormControl('',[Validators.required]),
    new_pass: new FormControl('',[Validators.required])
  });

  // profile_UserIdGet = decodeURIComponent(this.route.snapshot.paramMap.get('email_Id'));
  profile_UserIdGet = this.sds.decrypt(this.route.snapshot.paramMap.get('email_Id'))
  currentDate:Date;
  twentyFourHoursAgo:Date;
  responseDate:Date;

  ngOnInit() {

    // console.log(this.profile_UserIdGet, 'fff');
    this.currentDate = new Date();
    const twentyFourHoursAgoMilliseconds = this.currentDate.getTime() - (24 * 60 * 60 * 1000);
    this.twentyFourHoursAgo = new Date(twentyFourHoursAgoMilliseconds);
    console.log(this.twentyFourHoursAgo,'twentyFourHoursAgo');
    if(this.twentyFourHoursAgo < this.currentDate){
      this.linkExpired = true
    console.log('Link has been expired','currentDate');
    }
    else{
      console.log('twentyFourHoursAgo');
    }
  }
  submit(){
    this.passData={
      email_id: this.profile_UserIdGet,
      pass: this.passwordForm.controls.new_pass_1.value,
    }
    this.service.global_service(1, '/profile/update_forget_pass',{data: btoa(JSON.stringify(this.passData))}).subscribe((data: any)=>{
    })
    //  console.log(this.passwordForm.controls.new_pass_1.value)
    //  console.log(this.passwordForm.controls.new_pass.value)
  }
  validatePasswordMatch() {
    const newPassword = this.passwordForm.get('new_pass_1')?.value;
    const confirmPassword = this.passwordForm.get('new_pass')?.value;
    if (newPassword === confirmPassword) {
      this.passwordForm.setErrors(null);
      this.errorPass=""
      this.isButtonDisabled = false;
    } else {
  this.errorPass="*Confirm password should be same as new password"
  this.isButtonDisabled = true;
    }
  }
}
