import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { DataService } from 'src/app/Services/data.service';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private service:DataService, private msgService: MessageService,  private router:Router,private formBuilder: FormBuilder, private sds:SecrectDataService, private location: Location) { }

  localstorageDT:any
  dt:any
  responseData:any


  hide_old = true;
  hide_new = true;
  hide_con = true;

  isButtonDisabled: boolean = false;
  errorPass:any;
  checkPassword = true;
  

  passwordForm = new FormGroup({
    old_pass: new FormControl('',[Validators.required]),
    new_pass_1: new FormControl('',[Validators.required]),
    new_pass: new FormControl('',[Validators.required])
  });

  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  ngOnInit() {

    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   ​​​user_name:localStorage.getItem("​​​user_name")
    //  }

    this.localstorageDT = {
      id: this.getLocalSecrectUrl.data.id,
      ​​​user_name: this.getLocalSecrectUrl.data.​​​user_name
     }
     
  }

  goBack(): void {
    this.location.back();
  }

  savebtn() { 

    const newPassword = this.passwordForm.get('new_pass_1')?.value;
    const confirmPassword = this.passwordForm.get('new_pass')?.value;
    
    if (newPassword === confirmPassword) {

    this.dt={
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      old_pass: this.passwordForm.controls.old_pass.value,
      new_pass: this.passwordForm.controls.new_pass.value,
    }


    this.service.global_service(1, '/user/update_pass', {data: btoa(JSON.stringify(this.dt))}).subscribe(data=>{
      this.responseData = data;
      
      if(this.responseData.suc > 0){
        
      
       

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      })

    } else {
      this.errorPass="*The password confirmation does not match"
      this.isButtonDisabled = true;
    }

  }

  validCheck(i:any){
    i.target.value.length;
    const inputString=i.target.value;
    const specialCharRegex = /[\W_]/; 
    const uppercaseRegex = /[A-Z]/;
    if (!specialCharRegex.test(inputString) || !uppercaseRegex.test(inputString)) {
      this.checkPassword=false;
    }

    else if (inputString.length < 8) {
      this.checkPassword=false;
    }
    else{
      this.checkPassword=true;
    }
  }
  
  validatePasswordMatch() {
    const newPassword = this.passwordForm.get('new_pass_1')?.value;
    const confirmPassword = this.passwordForm.get('new_pass')?.value;
    if (newPassword === confirmPassword) {
      
      // Passwords match, enable the submit button
      this.passwordForm.setErrors(null);
      this.errorPass=""
      this.isButtonDisabled = false;
    } else {
      
      // Passwords do not match, disable the submit button
      // this.form_step_2.setErrors({ mismatch: true });
  this.errorPass="*The password does not match"
  this.isButtonDisabled = true;

    }
  }

}
