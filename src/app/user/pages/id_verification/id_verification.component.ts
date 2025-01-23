import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, NonNullableFormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { DataService } from 'src/app/Services/data.service';
import { pluck } from 'rxjs';
import { user_basic_info } from 'src/app/Model/user_dtls';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-id_verification',
  templateUrl: './id_verification.component.html',
  styleUrls: ['./id_verification.component.css']
})
export class Id_verificationComponent implements OnInit, AfterContentChecked {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  selectedDocumentType: any
  showExpairMsg = true;
  display_new: any;
  generateOTP_btn = false;
  showOtpComponent = true;
  timerInt: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '35px'
    }
  };
  getOPTResponse: any
  aadharOTP: any
  panVerify: any
  aadharVerify: any
  showAadharInput = false;
  showPanInput = false;
  kyc_flag: any
  getPanVerifyResponse: any
  ref_id: any
  otp: string
  aadharotp: string
  getOTP: any
  getVerifyResponse: any
  aadharName: string
  panName: string
  verifyBtn = false
  aadharKycFlag: any
  getFlagResponse: any
  user_basic_info: any;
  user_basic_info_New: user_basic_info;
  profileFlag: any
  panKycFlag: any
  hide_verification = false


  responseData: any
  localstorageDT: any
  list: any
  docType: any
  selectedFile: File | null = null;
  selectedFilePassport: File | null = null;
  selectedValue: any;
  docTypeSelect!: FormGroup;
  docType_id: any;
  groomLoc_ProfInfo: any;
  isDisable_1 = true;
  isDisable_2 = true;
  // user_country = localStorage.getItem("user_country");
  getLocalSecrectUrl = this.sds.getLocalSecrectData();
  user_country = this.getLocalSecrectUrl.data.user_country;
  Out_Of_India: boolean = false;
  citizenship_India: boolean = false;
  otpFieldActive = false;
  otpControl = new FormControl('');

  adhaarAlert = false;
  pannAlert = false;

  constructor(private service: DataService, private msgService: MessageService, private router: Router, private formBuilder: FormBuilder, private sds:SecrectDataService, private location: Location) { }

  ngOnInit() {

    this.doc_type_list()

    // this.localstorageDT = {
    //   id: localStorage.getItem("id"),
    //   user_name: localStorage.getItem("​​​user_name"),
    //   profile_flag: localStorage.getItem("​​​profile_flag")
    // }

    this.localstorageDT = {
      id: this.getLocalSecrectUrl.data.id,
      user_name: this.getLocalSecrectUrl.data.user_name,
      profile_flag: this.getLocalSecrectUrl.data.profile_flag
    }

    
    
    // this.verifyBtn = this.localstorageDT.profile_flag == 'Y' ? true : false;
    this.docTypeSelect = this.formBuilder.group({
      doc_type: ['', {validators:this.user_country == 'India'  ? [Validators.required] : null}],
      aadharNumber: [''],
      panNumber: [''],

      otp_input:[''],
      // user_id: [localStorage.getItem("id")],
      // user: [localStorage.getItem("​​​user_name")],

      user_id: [this.getLocalSecrectUrl.data.id],
      user: [this.getLocalSecrectUrl.data.user_name],


    });
    // this.get_GroomLocation_ProfInfoDtls();

    //Need To Fetch Passport From API  as this passport field is disabled

    //   this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
    //     var responseData:any;
    //     responseData = data;
    //     responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    //     this.user_basic_info = JSON.parse(responseData)
    //     this.user_basic_info_New = JSON.parse(responseData)[0];
    //     this.profileFlag = JSON.parse(responseData)[0].profile_verify_flag
    //     localStorage.setItem("profile_flag", this.profileFlag); 

    // })
    // this.verifyBtn = this.localstorageDT.profile_flag == 'Y' ? true : false;
  }

  goBack(): void {
    this.location.back();
  }

  ngAfterContentChecked(): void {
    // this.verifyBtn = localStorage.getItem('​​​profile_flag') == 'Y' ? true : false;
    this.verifyBtn = this.getLocalSecrectUrl.data.profile_flag == 'Y' ? true : false;
  }

  ngAfterViewInit(): void {
         this.docTypeSelect.controls['doc_type'].valueChanges.subscribe(res =>{
            if(res == 1){
                this.docTypeSelect.controls['aadharNumber'].setValidators([Validators.required,Validators.minLength(12),Validators.maxLength(12)]);
                this.docTypeSelect.controls['panNumber'].removeValidators([Validators.required,]);
              }
            else if(res == 2){
              this.docTypeSelect.controls['panNumber'].setValidators([Validators.required,Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/),Validators.minLength(10),Validators.maxLength(10)]);
              this.docTypeSelect.controls['aadharNumber'].removeValidators([Validators.required,]);
            }
            this.docTypeSelect.controls['panNumber'].updateValueAndValidity();
            this.docTypeSelect.controls['aadharNumber'].updateValueAndValidity();
         })
  }
  panValidator(control) {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (control.value && !panRegex.test(control.value)) {
      return { invalidPan: true };
    }

    return null;
  }


  onDocumentTypeChange(event) {
    this.kyc_flag = null
    const selectedValue = event.value;

    // Reset previous states
    this.showAadharInput = false;
    this.showPanInput = false;

    // Check the selected value and show the corresponding input field
    if (selectedValue === 1) {
      this.showAadharInput = true;
      this.kyc_flag = 'A'

    } else if (selectedValue === 2) {
      this.showPanInput = true;
      this.kyc_flag = 'P'
    }
  }


  // get_GroomLocation_ProfInfoDtls() {

  //   if (this.user_country.toLowerCase() == "india") {
  //     this.Out_Of_India = true
  //     this.citizenship_India = false;

  //   }
  //   else {
  //     this.Out_Of_India = false
  //     this.citizenship_India = true;
  //     this.f['doc_type'].setValue(2);
  //     this.f['doc_type'].disable();

  //   }
  // }
  get f() { return this.docTypeSelect.controls }

  // doctypeVal(){
  //   this.docType_id=(this.f['doc_type'].value)
  //   // debugger
  // }
  doc_type_list() {
    this.service.global_service(0, '/kyc/doc_list', null).subscribe((data: any) => {
      this.responseData = data;
      this.responseData = this.responseData.suc > 0 ? atob(this.responseData.msg) : false
      this.list = JSON.parse(this.responseData)
      // this.docType = JSON.parse(this.responseData.doc_type)

    })
  }
  // onFileSelected(event: any) {
  //   this.docTypeSelect.get('kyc_file').setValidators([
  //     Validators.required,
  //     this.fileExtensionValidator(['pdf','jpg','jpeg','png']),
  //     this.fileSizeValidator(event.target.files)]);
  //   this.docTypeSelect.get('kyc_file').updateValueAndValidity();
  //   if(
  //     this.docTypeSelect.get('kyc_file').status == 'VALID' &&
  //     event.target.files.length > 0
  //   ){
  //    this.docTypeSelect.get('kyc_img').patchValue(event.target.files[0]);
  //   }
  //   else{
  //    this.docTypeSelect.get('kyc_img').patchValue('');
  //   }
  //   this.selectedFile = event.target.files[0];
  // }


  /***ESHITA DEY*/
  // fileExtensionValidator(validExt: Array<string>): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     let forbidden = true;
  //     if (control.value) {
  //       const fileExt = control.value.split('.').pop();
  //       validExt.forEach(ext => {
  //         if (ext == fileExt) {
  //           forbidden = false;
  //         }
  //       });
  //        return forbidden ? { 'inValidExt': true } : null;
  //     }
  //     return null;
  //   };
  // }


  // fileSizeValidator(files: FileList | null = null): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {


  //       if(control.value &&  files.length > 0){
  //           const fileSize = files[0].size;
  //           const fileSizeInKB = Math.round(fileSize / 1024);


  //           if (fileSizeInKB > 5120) {
  //           return  {
  //               fileSizeValidator: true
  //             };
  //           } else {
  //           return null;
  //           }
  //           }
  //           return null;

  //           };
  //       }
  /****END */

  // onFileSelectedPassport(passport: any) {

  //   this.selectedFilePassport = passport.target.files[0];

  // }
  onSubmit(event:any) {
    // if (this.localstorageDT.user_name == this.aadharName) {
    //   this.hide_verification = true
    //   this.generateOTP_btn = false
    // }
    // this.generateOTP_btn = false
    // if(this.user_country == 'India'){

  this.adhaarAlert = false;
  this.pannAlert = false;

    if (this.kyc_flag == 'A') {
      if(!this.otpFieldActive){
        
        this.aadharOTP = {
          aadhaar: this.docTypeSelect.controls['aadharNumber'].value
        }
        this.service.global_service(1, '/kyc/aadhar_okyc_send_otp', { data: btoa(JSON.stringify(this.aadharOTP)) }).subscribe((data: any) => {
          this.getOPTResponse = data;
          if (this.getOPTResponse.suc > 0) {
            this.generateOTP_btn = true;
            this.ref_id = this.getOPTResponse.msg.ref_id
            this.otpFieldActive = true;
            this.kyc_flag = 'A'
          }
          else if (this.getOPTResponse.suc == 0) {
            this.otpFieldActive = false;
            const res=this.getOPTResponse.message
            this.msgService.errorMsg('INV_AADHAAR');
            // alert("OTP not send")
            
          }

        })
        
      }
      else { 
        // this.service.global_service(1, '/kyc/aadhar_okyc_verify', this.aadharVerify).subscribe(data => {
          // debugger      
        this.service.global_service(1, '/kyc/aadhar_okyc_verify', { data: btoa(JSON.stringify(this.aadharVerify)) }).subscribe(data => {
        this.getVerifyResponse = data;
        this.aadharName = this.getVerifyResponse.msg.name
        // if(this.getVerifyResponse.suc==0){
        //   this.msgService.errorMsg('OTP_NOT_MAT');
        // }
      if(this.getVerifyResponse.suc > 0 ){
        // debugger
        if (this.localstorageDT.user_name.trim().toLowerCase() == this.aadharName.toLowerCase()) {
          // debugger
          this.adhaarAlert = false;
          this.aadharKycFlag = {
            field_kyc_type: "A",
            user_name: this.localstorageDT.user_name,
            user_id: this.localstorageDT.id,
          }
          this.service.global_service(1, '/kyc/update_kyc_flag', this.aadharKycFlag).subscribe(data => {
            this.getFlagResponse = data;
            if (this.getFlagResponse.suc > 0) {
              this.msgService.successMsg('VS');
              this.generateOTP_btn = false;
              // localStorage.removeItem('​​​profile_flag');
              // localStorage.setItem('​​​profile_flag', 'Y');
              this.sds.setLocalSecrectData({​​​profile_flag: 'Y'})
              
            } else {
              // localStorage.removeItem('​​​profile_flag');
              // localStorage.setItem('​​​profile_flag', 'N');
              this.sds.setLocalSecrectData({​​​profile_flag: 'N'})
            }
          })
        }
        else {
          // alert('Name Mismatch')
          this.adhaarAlert = true;
          // localStorage.removeItem('​​​profile_flag')
          // localStorage.setItem('​​​profile_flag', 'N')
          this.sds.setLocalSecrectData({​​​profile_flag: 'N'})

        }
      }
      else if(this.getVerifyResponse.suc==0){
        this.msgService.errorMsg('OTP_NOT_MAT');
          // alert('Invalid OTP')
        }
      })
      }
    }

    
    if (this.kyc_flag == 'P') {

      this.panVerify = {
        pan: this.docTypeSelect.controls['panNumber'].value
      }
      
      this.service.global_service(1, '/kyc/pan_okyc_verify', { data: btoa(JSON.stringify(this.panVerify)) }).subscribe((data: any) => {
        this.getPanVerifyResponse = data;
        this.panName = this.getPanVerifyResponse.msg.registered_name

        if (this.getPanVerifyResponse.msg.pan_status == "VALID") {
          if(this.panName==undefined){
            // alert("Invalid Pan")
           }
          // debugger
          if (this.localstorageDT.user_name.toLowerCase() == this.panName.toLowerCase()) {
            // debugger
            // alert(this.getPanVerifyResponse.msg.message)
            this.pannAlert = false;
            this.panKycFlag = {
              field_kyc_type: "P",
              user_name: this.localstorageDT.user_name,
              user_id: this.localstorageDT.id,
            }
            this.service.global_service(1, '/kyc/update_kyc_flag', this.panKycFlag).subscribe(data => {
              this.getFlagResponse = data;
              if (this.getFlagResponse.suc > 0) {
                this.msgService.successMsg('VS');
                // localStorage.removeItem('​​​profile_flag')
                // localStorage.setItem('​​​profile_flag', 'Y')

                this.sds.setLocalSecrectData({​​​profile_flag: 'Y'})
              } else {
                // localStorage.removeItem('​​​profile_flag')
                // localStorage.setItem('​​​profile_flag', 'N')

                this.sds.setLocalSecrectData({​​​profile_flag: 'N'})

              }
            })

          }
          else {
            // alert("The name against the entered pan number does not match with your profile name")
            this.pannAlert = true;
            // localStorage.removeItem('​​​profile_flag')
            // localStorage.setItem('​​​profile_flag', 'N')
            this.sds.setLocalSecrectData({​​​profile_flag: 'N'})
          }


        }
        else if (this.getPanVerifyResponse.msg.pan_status == "INVALID") {
          alert(this.getPanVerifyResponse.msg.message)
        }
      }
      )
    }
    // }
    // else{
    //   // For Foreign User
    // }


    // if(this.user_country.toLowerCase()=="india"){
    /**********************************ESHITA Dey WORK ON THAT******************************** */
    // const { ['kyc_file']: kyc_file, ...userWithoutGroup } = this.docTypeSelect.getRawValue(); // FOR REMOVE THE EXTRA KEY FROM OBJECT
    // this.service.global_service(1, '/kyc/update_doc_list', this.service.convertFormData(userWithoutGroup))
    // .pipe(pluck("suc"))
    // .subscribe((data:number) =>{
    //     if(data > 0){
    //       this.msgService.successMsg('SU');
    //       // this.docTypeSelect.reset();
    //     }else{
    //       this.msgService.errorMsg('ES')
    //     }
    // })
    /**********************************END******************************** */
    // } else {
    // if (!this.selectedFile) {
    //   this.msgService.errorMsg('EU')
    //   console.error("No file selected.");
    //   return;
    // }

    // if (!this.selectedFilePassport) {
    //   this.msgService.errorMsg('EU')
    //   console.error("No file selected.");
    //   return;
    // }




    // const formData_Outsid = new FormData();
    // formData_Outsid.append('kyc_img', this.selectedFile);
    // formData_Outsid.append('kyc_file', this.selectedFilePassport);
    // formData_Outsid.append('doc_type', this.docType_id);
    // formData_Outsid.append('user_id',this.localstorageDT.id);
    // formData_Outsid.append('user',this.localstorageDT.user_name);
    // }



  }
  getFieldValue(i: any) {
    this.docType_id = i.source._value;
  }
  resendOTP() {
    // this.form_user_phone_send.controls.optField.reset();
    this.ngOtpInput.setValue('');
    // this. verifyEmail();
    this.timer_new(5);

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
      } else {
        this.showExpairMsg = true;
      }

    }, 1000);
  }

  onOtpChange(otp) {
   

    this.otp = otp;
    this.aadharVerify = {
      otp: otp,
      ref_id: this.ref_id
    }


    if (this.otp.length == 6) {

      // if (this.getOTP == this.otp) {
      // this.verifyBtnActive = true;
      // alert('match otp')
      // this.service.global_service(1, '/kyc/aadhar_okyc_verify', { data: btoa(JSON.stringify(this.aadharVerify)) }).subscribe(data => {
      //   this.getVerifyResponse = data;
      //   this.aadharName = this.getVerifyResponse.msg.name

      //   if (this.localstorageDT.user_name == this.aadharName) {
      //     this.aadharKycFlag = {
      //       field_kyc_type: "A",
      //       user_name: this.localstorageDT.user_name,
      //       user_id: this.localstorageDT.id,
      //     }
      //     this.service.global_service(1, '/kyc/update_kyc_flag', this.aadharKycFlag).subscribe(data => {
      //       this.getFlagResponse = data;
      //       if (this.getFlagResponse.suc > 0) {
      //         localStorage.removeItem('​​​profile_flag')
      //         localStorage.setItem('​​​profile_flag', 'Y')
      //       } else {
      //         localStorage.removeItem('​​​profile_flag')
      //         localStorage.setItem('​​​profile_flag', 'N')
      //       }
      //     })
      //   }
      //   else {
      //     localStorage.removeItem('​​​profile_flag')
      //     localStorage.setItem('​​​profile_flag', 'N')

      //   }



      // })

      // } 
      // else {
      //   alert('not match otp')
      //   this.verifyBtnActive = false;
      //   this.msgService.errorMsg('OTP_NOT_MAT')
      // }
    } else {
      // alert('Invalid Otp')
    }

  }
  onclickcheck(otp) {
    // this.onOtpChange(otp);
    this.generateOTP_btn = false;

    // if(this.response_update_email_flag.suc > 0){
    //     this.verifyBtn=true
    //   }
    //   else{
    //     this.verifyBtn=false

    //   }
  }
}
