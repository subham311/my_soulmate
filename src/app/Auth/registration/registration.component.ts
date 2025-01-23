import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatStepper } from '@angular/material/stepper';


declare let google: any;

export interface Edu {
  id: any;
  name: string;
  edu_id:any;
}

export interface Occup {
  id: any;
  name: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit, AfterViewInit {

  birth_loc_name:any;
  birth_loc_lat:any;
  birth_loc_long:any;
  birth_loc_latlong:any;
  
  filteredLoc: Observable<any>;
  workLocation: Observable<any>;
  autocompleteInput: string;
  queryWait: boolean;

  hide = true;
  hide_con = true;

  isButtonDisabled: boolean = false;
  isButtonDisabledAge: boolean = false;
  checkPassword:boolean = false;

  errorPass:any

  store_formData_1:any;
  store_formData_2_1:any;
  store_formData_2:any;
  store_formData_3:any;
  store_formData_4:any;
  store_formData_5:any;
  store_formData_6:any;
  frmFlag:any = 'fr2';
  
  

  locationData_dropdown:any;
  caste_list:any;
  gothram_list:any;
  state_shorting = new Array();
  occupation_list:any;
  income_list:any;
  education:any;
  eduData:any=new Array()
  ocuData:any=new Array()

  lang_list:any; 

  frm_Response_common:any;
  userInsertedId:any = 0;
  // cityList:any = [];

  
  validMobileNum_Response:any;
  validMobileNum_msg:any;
  isReadOnlyOtp =true;
  isReadOnlyNam=false;
  isReadOnlyMob=false;
  mobShoud_10:any;
  getOPTResponse:any;
  getOTP:any;
  verifyBtnActive = true;
  verify_email:any;
  isEmailExit = true;
  isEmaiAlrtTxt:any;

  serverSideValid_1 = false;
  serverSideValid_2 = false;
  serverSideValid_3 = false;
  serverSideValid_4 = false;
  serverSideValid_5 = false;
  serverSideValid_6 = false;

  passReqFld:any = false

  age:any;
  showAge:any;

  generateOTP_btn = true;
  numberIsExist:any;

  ischecked_Terms_Condition = true;
  ischecked_Terms_Condition_2 = true;
  Work_LocatioList:any;

  userName_phone:any

  count_AboutMyFamily: any =0;;
  count_AboutYou: any = 0;

  showForEditArea = true;

  isLogin:any;

  step1Complete = false;
  serverSideCheckForm_1_Valid = true;
  receivedData_Form_1:any;
  receivedData_Form_1_msg:any;
  receivedData_Form_1_msg_String:any;
  receivedData_Form_1_msg_Aray:any;

  step2Complete = false;
  serverSideCheckForm_2_Valid = true;
  receivedData_Form_2:any;
  receivedData_Form_2_msg:any;
  receivedData_Form_2_msg_String:any;
  receivedData_Form_2_msg_Aray:any;
  activeTabForm_1 = true;

  step3Complete = false;
  serverSideCheckForm_3_Valid = true;
  receivedData_Form_3:any;
  receivedData_Form_3_msg:any;
  receivedData_Form_3_msg_String:any;
  receivedData_Form_3_msg_Aray:any;

  step4Complete = false;
  serverSideCheckForm_4_Valid = true;
  receivedData_Form_4:any;
  receivedData_Form_4_msg:any;
  receivedData_Form_4_msg_String:any;
  receivedData_Form_4_msg_Aray:any;

  step5Complete = false;
  serverSideCheckForm_5_Valid = true;
  receivedData_Form_5:any;
  receivedData_Form_5_msg:any;
  receivedData_Form_5_msg_String:any;
  receivedData_Form_5_msg_Aray:any;

  step6Complete = false;
  serverSideCheckForm_6_Valid = true;
  receivedData_Form_6:any;
  receivedData_Form_6_msg:any;
  receivedData_Form_6_msg_String:any;
  receivedData_Form_6_msg_Aray:any;

  step7Complete = false;
  // serverSideCheckForm_6_Valid = true;
  // receivedData_Form_6:any;
  // receivedData_Form_6_msg:any;
  // receivedData_Form_6_msg_String:any;
  // receivedData_Form_6_msg_Aray:any;

  offRegestrationForm = true;
  popupWindowAftreRegestra = false;

  

  
  constructor(private service:DataService, private router:Router, private msgService: MessageService, private datePipe: DatePipe, private _formBuilder: FormBuilder) {

    
    this.isLogin = this.service.login();
    if(this.isLogin){
      // this.router.navigate(['/user_dashboard']);
      this.router.navigate(['/user/profile_list']);
 
    }
    
   }

  //  formGroup_1

   form_step_2_1 = this._formBuilder.group({
  field_name: new FormControl('',[Validators.required]),
  field_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  field_birth_loca: new FormControl('', [Validators.required]),
  field_birth_date: new FormControl('', [Validators.required]),
  });

  form_step_2 = this._formBuilder.group({
  // formCtrl_2: ['', Validators.required],

  field_gender: new FormControl('',[Validators.required]),
  field_who_creat_profile: new FormControl('',[Validators.required]),
  field_email_id: new FormControl('',[Validators.required,Validators.email]),

   // field_Country: new FormControl('', [Validators.required]),
  field_Country: new FormControl(''),
   field_Country1: new FormControl('', [Validators.required]),

  // field_State: new FormControl('', [Validators.required]),
  field_State: new FormControl(''),
  field_State1: new FormControl('', [Validators.required]),

  // field_mother_tong: new FormControl('', [Validators.required]),
  field_mother_tong: new FormControl(''),
  field_mother_tong1: new FormControl('', [Validators.required]),

  field_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  field_confirm_pass: new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  form_step_3 = this._formBuilder.group({
  // formCtrl_3: ['', Validators.required],
  // field_cast: new FormControl('', [Validators.required]),
  field_cast: new FormControl(''),
  field_cast1: new FormControl('', [Validators.required]),

  // field_ur_religion: new FormControl('', [Validators.required]),
  field_ur_religion: new FormControl(''),
  field_ur_religion1: new FormControl('', [Validators.required]),

  // field_City: new FormControl(''),
  // field_City1: new FormControl(''),

  });

  form_step_4 = this._formBuilder.group({
  // formCtrl_4: ['', Validators.required],
  field_marital_status: new FormControl('', [Validators.required]),
  field_height: new FormControl('', [Validators.required]),
  field_weight: new FormControl('', [Validators.required]),
  field_body_type: new FormControl('', [Validators.required]),
  field_family_status: new FormControl('', [Validators.required]),
  field_family_type: new FormControl('', [Validators.required]),
  field_family_value: new FormControl('', [Validators.required]),
  field_disability: new FormControl('', [Validators.required]),

  });

  form_step_5 = this._formBuilder.group({
  // formCtrl_5: ['', Validators.required],

  field_highest_education: new FormControl(<any | Edu>'', [Validators.required]),
  field_employed: new FormControl('', [Validators.required]),
  field_Occupation: new FormControl(<any | Occup>'', [Validators.required]),
  field_Annual_Income: new FormControl('', [Validators.required]),
  field_Annual_Income1: new FormControl('', [Validators.required]),
  field_Work_Locatio: new FormControl('', [Validators.required]),

  });

  form_step_6 = this._formBuilder.group({
  // formCtrl_6: ['', Validators.required],

  field_About_us: new FormControl('',[Validators.required, Validators.maxLength(250)]),
  });

  form_step_7 = this._formBuilder.group({
    // formCtrl_7: ['', Validators.required],

    terms: new FormControl('',[Validators.required]),
    terms_2: new FormControl('',[Validators.required])
    });

  isLinear = true;

  

  // form_step_1 = new FormGroup({
  //   field_name: new FormControl('',[Validators.required]),
  //   field_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  //   type_OTP: new FormControl('', [Validators.required]),
  // });

  // form_step_2_1 = new FormGroup({
  //   field_name: new FormControl('',[Validators.required]),
  //   field_mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  //   field_birth_loca: new FormControl('', [Validators.required]),
  //   field_birth_date: new FormControl('', [Validators.required]),
  // });

  form_step_2_1_field_name = {
    'user': 'Name',
    'field_mobile': 'Mobile No',
    'location_id': 'Actual Birth Location',
    'field_birth_date': 'DOB'
  }

  form_step_2_field_name = {
  "field_gender": 'Gender',
  "field_who_creat_profile": 'Who Creat Profile',
  "field_email_id": 'Email Id',
  "field_Country": 'Country',
  "field_State": 'State',
  "field_mother_tong": 'Mother Tongue',
  "field_pass": 'Password'
  }

  form_step_3_field_name = {
  "field_cast": 'Cast',
  "field_ur_religion": 'Religion'
  }
  

  form_step_4_field_name = {
    "field_marital_status": 'Marital Status',
    "field_height": 'Height',
    "field_weight": 'Weight',
    "field_body_type": 'Body Type',
    "field_family_status": 'Family Status',
    "field_family_type": 'Family Type',
    "field_family_value": 'Family Value',
    "field_disability": 'Disability',
    }

  form_step_5_field_name = {
    "field_highest_education": 'Highest Education',
    "field_employed": 'Employed',
    "field_Occupation": 'Occupation',
    "field_Annual_Income": 'Annual_Income',
    "field_Work_Locatio": 'Work Locatio',
  }
  
  form_step_6_field_name = {
    "field_About_us": 'About Us',
  }



  filteredCountry:any
  filteredState:any
  filteredCity:any
  filteredMotherTongue:any
  filteredRel:any
  filteredCaste:any
  filteredEducation:any
  filteredOccupation:any
  filteredIncome:any

  countryList = new Array();
  stateList = new Array();
  cityList = new Array();
  DOBList:any;

  autocomplete:any;
  locationPlaces: any;
  // rel_url='/assets/JSON/religion.json'
  relData:any

  selectFutureDate = false;






  ngOnInit() {
   
  this.service.local_service(environment.rel_url).subscribe(data=>{
    this.relData=data
    this.filteredRel= this.relData
  })

    this.service.userName_PhoneSend.subscribe((res)=>{
      this.userName_phone = res
      this.form_step_2_1.patchValue({
        field_name: this.userName_phone.home_user,
        field_mobile: this.userName_phone.home_phone,
      })
      return this.userName_phone;
      
    });

    if(!this.userName_phone){
      this.router.navigate(['/home']);
    }
    



    this.frmFlag ='fr2_1'


    this.service.global_service(0, '/master/countries_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.countryList = responseData ? JSON.parse(responseData) : 'Error occures in API'
      this.countryList = this.countryList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.filteredCountry = responseData ? JSON.parse(responseData) : 'Error occures in API'

      })

      this.service.global_service(0, '/master/location_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        this.locationData_dropdown = responseData ? JSON.parse(responseData) : 'Error occures in API'
    
        this.locationData_dropdown.forEach((item:any)=> {
          var existing = this.state_shorting.filter(function(v:any, i:any) {
            return v.name == item.name;
          });
          
          if (!existing.length) {
          this.state_shorting.push(item);
          
          }
        });
        })





    this.service.global_service(0, '/master/caste_list', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.caste_list = JSON.parse(responseData)
    this.filteredCaste = this.caste_list
    })

    this.service.global_service(0, '/master/occupation_list', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.occupation_list = JSON.parse(responseData)

    for(let dt of Object.keys(this.occupation_list)){
      for(let dt1 of this.occupation_list[dt]){
        this.ocuData.push(dt1)
      }
    }
    this.filteredOccupation = this.form_step_5.controls.field_Occupation.valueChanges.pipe(
      startWith(''),
      map((value:any) =>{
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterGroup1(name as string) : this.ocuData.slice();
      }),
    );
    })

    this.service.global_service(0, '/master/income_list', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.income_list = JSON.parse(responseData)
    this.filteredIncome= this.income_list
    })

    this.service.global_service(0, '/master/lang_list', null).subscribe((data:any) => {
      
    var responseData:any;
    responseData = data
    
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.lang_list = JSON.parse(responseData)
    this.filteredMotherTongue=this.lang_list
    })

    this.service.global_service(0, '/master/education', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.education = JSON.parse(responseData)

    for(let dt of Object.keys(this.education)){
      for(let dt1 of this.education[dt]){
        this.eduData.push(dt1)
      }
    }

    this.filteredEducation = this.form_step_5.controls.field_highest_education.valueChanges.pipe(
      startWith(''),
      map((value:any) =>{
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterGroup(name as string) : this.eduData.slice();
      }),
    );
    
    })
    

    // this.service.global_service(0, '/profile/check_mobile_no', `phone_no=${this.form_step_1.controls.field_mobile.value}`).subscribe((data:any) => {
    //   this.validMobileNum_Response = data;

      
    //   if(this.validMobileNum_Response.suc === 2){

    //     this.msgService.errorMsg('PH_EX');
    //     this.generateOTP_btn = true;
    //   } 

    //   if(this.validMobileNum_Response.suc === 1){
    //     this.generateOTP_btn = false;
    //   }

      
    //   })

     

    this.initForm()
  }


  
  ngAfterViewInit(): void {
     // Google API //
     this.getLocationList();
     // END //
  }

  initForm(){
    this.form_step_2.get('field_Country1').valueChanges.subscribe(response =>{
      this.filterDataCountry(response);
    })
      this.form_step_2.get('field_State1').valueChanges.subscribe(response =>{
        this.filterDataState(response);   
    })

  //   this.form_step_2.get('field_City1').valueChanges.subscribe(response =>{
  //     this.filterDataCity(response);   
  // })

  this.form_step_2.get('field_mother_tong1').valueChanges.subscribe(response =>{
    this.filterDataMotherTongue(response);   
})
this.form_step_3.get('field_ur_religion1').valueChanges.subscribe(response =>{
  this.filterDataRel(response);
})
this.form_step_3.get('field_cast1').valueChanges.subscribe(response =>{
  this.filterDataCaste(response);   
})
// this.form_step_5.get('field_highest_education1').valueChanges.subscribe(response =>{
//   this.filterDataEducation(response);   
// })
this.form_step_5.get('field_Annual_Income1').valueChanges.subscribe(response =>{
  this.filterDataIncome(response);   
})
  }
  filterDataCountry(enteredCountry){
    this.filteredCountry = this.countryList.filter(item=>{
      return item.name.toLowerCase().indexOf(enteredCountry.toLowerCase()) > -1
    })
  }
  filterDataState(enteredState){
    this.filteredState = this.stateList.filter(item=>{
      return item.name.toLowerCase().indexOf(enteredState.toLowerCase()) > -1
    })
  }
  filterDataCity(enteredCity){
    this.filteredCity = this.cityList.filter(item=>{
      return item.name.toLowerCase().indexOf(enteredCity.toLowerCase()) > -1
    })
  }
  filterDataMotherTongue(enteredMotherTongue){
      this.filteredMotherTongue = this.lang_list.filter(item=>{
        return item.lang_name.toLowerCase().indexOf(enteredMotherTongue.toLowerCase()) > -1
      })
     
  }
  filterDataRel(enteredRel){
    this.filteredRel = this.relData.filter(item=>{
      return item.name.toLowerCase().indexOf(enteredRel.toLowerCase()) > -1
    })
}
  filterDataCaste(enteredCaste){
    this.filteredCaste = this.caste_list.filter(item=>{
      return item.name.toLowerCase().indexOf(enteredCaste.toLowerCase()) > -1
    })
    
}

private _filterGroup(name: string): any[] {
  const filterValue = name.toLowerCase();
  return this.eduData.filter(option => option.name.toLowerCase().includes(filterValue));
}
private _filterGroup1(name: string): any[] {
  const filterValue = name.toLowerCase();
  return this.ocuData.filter(option => option.name.toLowerCase().includes(filterValue));
}

displayFn(user): string {
  return user && user.name ? user.name : '';
}

displayFnO(user): string {
  return user && user.name ? user.name : '';
}

// filterDataEducation(enteredEdu){
  
//   this.filteredEducation = this.education.filter(item=>{
//     return item.name.toLowerCase().indexOf(enteredEdu.toLowerCase()) > -1
//   })
// }
filterDataIncome(enteredIncome){
  this.filteredIncome = this.income_list.filter(item=>{
    return item.income.toLowerCase().indexOf(enteredIncome.toLowerCase()) > -1
  })
}
  

  getLocationList(){
    // Google API //
    
    const input = document.getElementById('location') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(this.autocomplete, 'place_changed', this.setLocationValue)
    // END //
  }

  setLocationValue = () => {
    this.locationPlaces = this.autocomplete.getPlace()
      
      this.birth_loc_name= this.locationPlaces.name
      this.birth_loc_lat= this.locationPlaces.geometry.location.lat().toString()
      this.birth_loc_long= this.locationPlaces.geometry.location.lng().toString()
      this.birth_loc_latlong= `${this.birth_loc_lat},${this.birth_loc_long}`
      // this.form_step_2.patchValue({
      //   field_birth_loca: `${this.birth_loc_name}-${this.birth_loc_lat},${this.birth_loc_long}`
      // })
      
  }

  private _filterStates(value): any[] {
    const filterValue = value.toLowerCase();

    return this.DOBList.filter(state => state.name.toLowerCase().includes(filterValue));
  }




  private _filterStates_2(value): any[] {
    const filterValue = value.toLowerCase();

    return this.DOBList.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  


  public getKeys(obj: any): string[] {
    
    return obj ? Object.keys(obj) : [];
  }





  // generateOTP(){
    
  //   this.service.global_service(1, '/profile/send_otp', {phone_no:this.form_step_1.controls.field_mobile.value}).subscribe((data:any) => {
  //     this.getOPTResponse = data;
      
  //     if(this.getOPTResponse.suc === 1){
  //       this.msgService.successMsg('TYP_OTP')
  //       this.isReadOnlyOtp =  false;
  //       this.isReadOnlyNam=true;
  //       this.isReadOnlyMob=true;

  //       this.getOTP = this.getOPTResponse.otp
        
        
  //       // localStorage.setItem('otp','Y');
  //     }

  //     if(this.getOPTResponse.suc === 2){

  //       this.msgService.errorMsg('MWRNG_MOB')
        
  //     }     
  //     })

  // }

// IGNORING OTP FOR TESTING //
// generateOTP() {
//   this.resendOTP_Desable = true;
//   this.getOTP = 1234
// }
// END //

  otpFn(event:any){

    if(this.getOTP == event.target.value){
      this.verifyBtnActive = false;
    } else {
      this.verifyBtnActive = true;
      this.msgService.errorMsg('OTP_NOT_MAT')
    }
    
  }

  // get_foem_data_1(){
  //   this.store_formData_1 = {
  //     field_name: this.form_step_1.controls.field_name.value,
  //     field_mobile: this.form_step_1.controls.field_mobile.value,
  //     type_OTP: this.form_step_1.controls.type_OTP.value
  //   }
  //   this.frmFlag = 'fr2_1';
  // }





  serverSideCheckForm_1(stepper: MatStepper){
    this.step1Complete = false;
    
    // this.serverSideValid_1 = false;
    // this.serverSideValid_2 = false;
    // this.serverSideValid_3 = false;
    // this.serverSideValid_4 = false;
    // this.serverSideValid_5 = false;
    // this.serverSideValid_6 = false;

    // this.activeTabForm_1 = true;
    // stepper = null;
    this.serverSideCheckForm_1_Valid = true;
    this.receivedData_Form_1_msg_String = '';
    this.receivedData_Form_1_msg_Aray = '';
    
    this.store_formData_1 = {
    user: this.form_step_2_1.controls.field_name.value,
    field_mobile: +this.form_step_2_1.controls.field_mobile.value,
    field_birth_date: this.form_step_2_1.controls.field_birth_date.value,
    location_id: this.birth_loc_name // need to change; location name variable
  }

  this.service.global_service(1, '/server/user_check', this.store_formData_1).subscribe(data=>{
    this.receivedData_Form_1 = data;
    
    
    if(this.receivedData_Form_1.suc < 1){
      this.serverSideValid_1 = false;

      if(typeof this.receivedData_Form_1.msg == "string"){
        this.receivedData_Form_1_msg_String = this.receivedData_Form_1.msg;
        
        
      }

      if(typeof this.receivedData_Form_1.msg == "object"){
        this.receivedData_Form_1_msg_Aray = this.receivedData_Form_1.msg
        this.receivedData_Form_1 = Object.keys(this.receivedData_Form_1.msg)
      }

      this.serverSideCheckForm_1_Valid = true;
    }

    if(this.receivedData_Form_1.suc > 0){
      this.serverSideValid_1 = true;

      this.step1Complete = !this.step1Complete;
      setTimeout(() =>{
        stepper.next();
      },3)
      this.serverSideCheckForm_1_Valid = false;

      

    }

    })



  //   receivedData_Form_1_msg_String:any;
  // receivedData_Form_1_msg_Aray:any;
  
  }


  serverSideCheckForm_2(stepper: MatStepper){
    // stepper = null;
    // this.activeTabForm_1 = true;
    
    this.serverSideCheckForm_2_Valid = true;
    this.receivedData_Form_2_msg_String = '';
    this.receivedData_Form_2_msg_Aray = '';
    
    this.store_formData_2 = {
      field_gender:this.form_step_2.controls.field_gender.value,
      field_who_creat_profile:this.form_step_2.controls.field_who_creat_profile.value,
      field_email_id:this.form_step_2.controls.field_email_id.value,
      field_Country:this.form_step_2.controls.field_Country.value,
      field_State:this.form_step_2.controls.field_State.value,
      field_mother_tong:this.form_step_2.controls.field_mother_tong.value.toString(),
      field_pass:this.form_step_2.controls.field_pass.value
      }

  this.service.global_service(1, '/server/user_basic_details', this.store_formData_2).subscribe(data=>{
    this.receivedData_Form_2 = data;
    
    

    if(this.receivedData_Form_2.suc < 1){
      this.serverSideValid_2 = false;
      if(typeof this.receivedData_Form_2.msg == "string"){
        this.receivedData_Form_2_msg_String = this.receivedData_Form_2.msg
      }

      if(typeof this.receivedData_Form_2.msg == "object"){
        this.receivedData_Form_2_msg_Aray = this.receivedData_Form_2.msg
        this.receivedData_Form_2 = Object.keys(this.receivedData_Form_2.msg)
      }

      this.serverSideCheckForm_2_Valid = true;
    }

    if(this.receivedData_Form_2.suc > 0){
      this.serverSideValid_2 = true;
      this.step2Complete = !this.step2Complete;
      setTimeout(() =>{
        stepper.next();
      },3)
      this.serverSideCheckForm_2_Valid = false;

    }

    })



  //   receivedData_Form_1_msg_String:any;
  // receivedData_Form_1_msg_Aray:any;
  
  }


  serverSideCheckForm_3(stepper: MatStepper){
    // stepper = null;
    // this.activeTabForm_1 = true;
    this.serverSideCheckForm_3_Valid = true;
    this.receivedData_Form_3_msg_String = '';
    this.receivedData_Form_3_msg_Aray = '';

    this.store_formData_3 = {
      field_cast: this.form_step_3.controls.field_cast.value,
      field_ur_religion: this.form_step_3.controls.field_ur_religion.value,
    }

  this.service.global_service(1, '/server/user_religion_details', this.store_formData_3).subscribe(data=>{
    this.receivedData_Form_3 = data;
    
    

    if(this.receivedData_Form_3.suc < 1){
      this.serverSideValid_3 = false;
      if(typeof this.receivedData_Form_3.msg == "string"){
        this.receivedData_Form_3_msg_String = this.receivedData_Form_3.msg
      }

      if(typeof this.receivedData_Form_3.msg == "object"){
        this.receivedData_Form_3_msg_Aray = this.receivedData_Form_3.msg
        this.receivedData_Form_3 = Object.keys(this.receivedData_Form_3.msg)
      }

      this.serverSideCheckForm_3_Valid = true;
    }

    if(this.receivedData_Form_3.suc > 0){
      this.serverSideValid_3 = true;
      this.step3Complete = !this.step3Complete;
      setTimeout(() =>{
        stepper.next();
      },3)
      this.serverSideCheckForm_3_Valid = false;

    }

    })

  
  }

  serverSideCheckForm_4(stepper: MatStepper){

    
    
    this.serverSideCheckForm_4_Valid = true;
    this.receivedData_Form_4_msg_String = '';
    this.receivedData_Form_4_msg_Aray = '';

    this.store_formData_4 = {
      field_marital_status: this.form_step_4.controls.field_marital_status.value,
      field_height: this.form_step_4.controls.field_height.value,
      field_weight: this.form_step_4.controls.field_weight.value,
      field_body_type: this.form_step_4.controls.field_body_type.value,
      field_family_status: this.form_step_4.controls.field_family_status.value,
      field_family_type: this.form_step_4.controls.field_family_type.value,
      field_family_value: this.form_step_4.controls.field_family_value.value,
      field_disability: this.form_step_4.controls.field_disability.value,
    }


  this.service.global_service(1, '/server/user_personal_details', this.store_formData_4).subscribe(data=>{
    this.receivedData_Form_4 = data;
    
    

    if(this.receivedData_Form_4.suc < 1){
      this.serverSideValid_4 = false;
      if(typeof this.receivedData_Form_4.msg == "string"){
        this.receivedData_Form_4_msg_String = this.receivedData_Form_4.msg
      }

      if(typeof this.receivedData_Form_4.msg == "object"){
        this.receivedData_Form_4_msg_Aray = this.receivedData_Form_4.msg
        this.receivedData_Form_4 = Object.keys(this.receivedData_Form_4.msg)
      }

      this.serverSideCheckForm_4_Valid = true;
    }

    if(this.receivedData_Form_4.suc > 0){
      this.serverSideValid_4 = true;
      this.step4Complete = !this.step4Complete;
      setTimeout(() =>{
        stepper.next();
      },3)
      this.serverSideCheckForm_4_Valid = false;

    }

    })

  }

  serverSideCheckForm_5(stepper: MatStepper){
// stepper = null;
    // this.activeTabForm_1 = true;
    this.serverSideCheckForm_5_Valid = true;
    this.receivedData_Form_5_msg_String = '';
    this.receivedData_Form_5_msg_Aray = '';

    this.store_formData_5 = {
      field_highest_education: this.form_step_5.controls.field_highest_education.value.id,
      field_employed: this.form_step_5.controls.field_employed.value,
      field_Occupation: this.form_step_5.controls.field_Occupation.value.id,
      field_Annual_Income: this.form_step_5.controls.field_Annual_Income.value.toString(),
      field_Work_Locatio: this.form_step_5.controls.field_Work_Locatio.value,
    }



  this.service.global_service(1, '/server/user_professional_details', this.store_formData_5).subscribe(data=>{
    this.receivedData_Form_5 = data;
    
    

    if(this.receivedData_Form_5.suc < 1){
      this.serverSideValid_5 = false;
      if(typeof this.receivedData_Form_5.msg == "string"){
        this.receivedData_Form_5_msg_String = this.receivedData_Form_5.msg
      }

      if(typeof this.receivedData_Form_5.msg == "object"){
        this.receivedData_Form_5_msg_Aray = this.receivedData_Form_5.msg
        this.receivedData_Form_5 = Object.keys(this.receivedData_Form_5.msg)
      }

      this.serverSideCheckForm_5_Valid = true;
    }

    if(this.receivedData_Form_5.suc > 0){
      this.serverSideValid_5 = true;
      this.step5Complete = !this.step5Complete;
      setTimeout(() =>{
        stepper.next();
      },3)
      this.serverSideCheckForm_5_Valid = false;

    }

    })
  }


  serverSideCheckForm_6(stepper: MatStepper){
    // stepper = null;
        // this.activeTabForm_1 = true;
        this.serverSideCheckForm_6_Valid = true;
        this.receivedData_Form_6_msg_String = '';
        this.receivedData_Form_6_msg_Aray = '';
    
        this.store_formData_6 = {
          field_About_us: this.form_step_6.controls.field_About_us.value.split('"').join(''),
        }
    
    
    
      this.service.global_service(1, '/server/user_about_details', this.store_formData_6).subscribe(data=>{
        this.receivedData_Form_6 = data;
        
        
    
        if(this.receivedData_Form_6.suc < 1){
          this.serverSideValid_6 = false;
          if(typeof this.receivedData_Form_6.msg == "string"){
            this.receivedData_Form_6_msg_String = this.receivedData_Form_6.msg
          }
    
          if(typeof this.receivedData_Form_6.msg == "object"){
            this.receivedData_Form_6_msg_Aray = this.receivedData_Form_6.msg
            this.receivedData_Form_6 = Object.keys(this.receivedData_Form_6.msg)
          }
    
          this.serverSideCheckForm_6_Valid = true;
        }
    
        if(this.receivedData_Form_6.suc > 0){
          this.serverSideValid_6 = true;
          this.step6Complete = !this.step6Complete;
          setTimeout(() =>{
            stepper.next();
          },3)
          // this.frmFlag = 'fr7';
          // this.serverSideCheckForm_6_Valid = false;
    
        }
    
        })
      }




  // serverSideCheckForm_1(){

  // }
   


  email_verify(event:any){
    this.service.global_service(0, '/profile/check_email', `email_id=${this.form_step_2.controls.field_email_id.value}`).subscribe((data:any) => {
      this.verify_email = data;

      if(this.verify_email.suc === 1){
        // this.msgService.successMsg('EMAIL_ACCEPT')
        this.isEmailExit = false;
        this.isEmaiAlrtTxt = ""
      }

      if(this.verify_email.suc === 2){

        // this.msgService.errorMsg('EMAIL_EXIT')
        this.isEmailExit = true;
        this.isEmaiAlrtTxt = this.verify_email.msg
        
      }
      
      })
    
  }

  checkAdult(event:any){
    

    this.age = this.datePipe.transform(this.form_step_2_1.controls.field_birth_date.value, 'yyyy-MM-dd');
      if(this.age){
        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        // console.log(Date.now(), '===', convertAge.getTime());

        if(Date.now() <= convertAge.getTime()){
          // alert('Date is Greater than now')
          this.selectFutureDate = true;
        }

        if(Date.now() > convertAge.getTime()){
          // alert('Date is Smaller than now');
          this.selectFutureDate = false;
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        }

        // this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        
        
      }

      if(this.showAge < 18){
        this.isButtonDisabledAge = true;

      

      } else {
        this.isButtonDisabledAge = false;
      }
    
  }



  validCheck(i:any){
    this.isButtonDisabled = false;

    const newPassword = this.form_step_2.get('field_pass')?.value;
    const confirmPassword = this.form_step_2.get('field_confirm_pass')?.value;

    if(newPassword===confirmPassword){
      
    this.errorPass=""
     this.checkPassword=false;
     this.isButtonDisabled = false;
      } else {
        this.checkPassword=true;
        this.isButtonDisabled = true;
        this.errorPass="*The password does not match"
      }


  }


  


  submitAllData(){

    this.store_formData_2 = {
      id:0,
      field_gender: this.form_step_2.controls.field_gender.value,
      field_who_creat_profile: this.form_step_2.controls.field_who_creat_profile.value,
      field_birth_loca: this.birth_loc_latlong, 
      location_id: this.birth_loc_name, 
      field_birth_date: this.form_step_2_1.controls.field_birth_date.value,
      field_ur_religion: this.form_step_3.controls.field_ur_religion.value,
      field_mother_tong: this.form_step_2.controls.field_mother_tong.value,
      field_mother_tong1: this.form_step_2.controls.field_mother_tong.value,
      field_email_id: this.form_step_2.controls.field_email_id.value,
      field_pass: this.form_step_2.controls.field_pass.value,
      field_confirm_pass: this.form_step_2.controls.field_confirm_pass.value,
      user: this.form_step_2_1.controls.field_name.value,
      field_mobile: this.form_step_2_1.controls.field_mobile.value,

      field_Country: this.form_step_2.controls.field_Country.value,
      field_Country1: this.form_step_2.controls.field_Country1.value,
      field_State: this.form_step_2.controls.field_State.value,
      field_State1: this.form_step_2.controls.field_State1.value,
      // field_City: this.form_step_2.controls.field_City.value,
      // field_City1: this.form_step_2.controls.field_City1.value

      // field_City: '',
      // field_City1: ''
    }

        this.service.global_service(1, '/user/user_profile', {data: btoa(JSON.stringify(this.store_formData_2))}).subscribe(data=>{
        this.frm_Response_common = data;

        if(this.frm_Response_common.suc > 0){
          

          // event.target.classList.add('class3'); // To ADD

        this.frmFlag = 'fr3';
        this.userInsertedId = this.frm_Response_common.lastId.insertId;

        this.store_formData_3 = {
          user_id: this.userInsertedId,
          field_cast: this.form_step_3.controls.field_cast.value,
          field_cast1: this.form_step_3.controls.field_cast.value,
          field_ur_religion: this.form_step_3.controls.field_ur_religion.value,
          field_ur_religion1: this.form_step_3.controls.field_ur_religion1.value,
          user: this.form_step_2_1.controls.field_name.value
        }

        this.service.global_service(1, '/user/user_caste', {data: btoa(JSON.stringify(this.store_formData_3))}).subscribe(data=>{
          this.frm_Response_common = data;
          if(this.frm_Response_common.suc > 0){
          this.frmFlag = 'fr4';
          // this.msgService.successMsg('SS');
  
          this.store_formData_4 = {
            user_id: this.userInsertedId,
            field_marital_status: this.form_step_4.controls.field_marital_status.value,
            field_height: this.form_step_4.controls.field_height.value,
            field_weight: this.form_step_4.controls.field_weight.value,
            field_body_type: this.form_step_4.controls.field_body_type.value,
            field_family_status: this.form_step_4.controls.field_family_status.value,
            field_family_type: this.form_step_4.controls.field_family_type.value,
            field_family_value: this.form_step_4.controls.field_family_value.value,
            field_disability: this.form_step_4.controls.field_disability.value,
            user: this.form_step_2_1.controls.field_name.value
          }

              this.service.global_service(1, '/user/user_personal_details', {data: btoa(JSON.stringify(this.store_formData_4))}).subscribe(data=>{
                this.frm_Response_common = data;
  
                if(this.frm_Response_common.suc > 0){
                this.frmFlag = 'fr5';

                this.store_formData_5 = {
                  user_id: this.userInsertedId,
                  field_highest_education: this.form_step_5.controls.field_highest_education.value.id,
                  field_employed: this.form_step_5.controls.field_employed.value,
                  field_Occupation: this.form_step_5.controls.field_Occupation.value.id,
                  field_Annual_Income: this.form_step_5.controls.field_Annual_Income.value,
                  field_Annual_Income1: new FormControl('', [Validators.required]),
                  field_Work_Locatio: this.form_step_5.controls.field_Work_Locatio.value,
                  user: this.form_step_2_1.controls.field_name.value
                }

                    this.service.global_service(1, '/user/user_professional', {data: btoa(JSON.stringify(this.store_formData_5))}).subscribe(data=>{
                      this.frm_Response_common = data;
            
                      if(this.frm_Response_common.suc > 0){
                      // this.frmFlag = 'fr6';

                      // this.frm_Response_common = '';
                      this.store_formData_6 = {
                        user_id:this.userInsertedId,
                        field_About_us: this.form_step_6.controls.field_About_us.value,
                        field_disclaimer: this.form_step_7.controls.terms.value ? 'Y' : 'N',
                        field_policy: this.form_step_7.controls.terms_2.value ? 'Y' : 'N',
                        // this.store_formData_2.profile_verify_flag ? this.store_formData_2.user_data[0].profile_verify_flag : 'N'
                        user: this.form_step_2_1.controls.field_name.value
                      }

                      

                          this.service.global_service(1, '/user/user_about', {data: btoa(JSON.stringify(this.store_formData_6))}).subscribe(data=>{
                            this.frm_Response_common = data;


                            
                  
                            if(this.frm_Response_common.suc > 0){

                              setTimeout(()=>{
                              this.offRegestrationForm = false;
                              this.popupWindowAftreRegestra = true;
                              }, 2000)

                              document.getElementById('popup_Id').classList.add('popupAnimated_Active');
                              document.getElementById('regestration_Id').classList.add('ragestrationFrm_None');
                  
                            // localStorage.setItem("login_success", '1');
                            // localStorage.setItem("plan_id", '0');
                            // localStorage.setItem("id", this.userInsertedId);
                            // localStorage.setItem("​​​​​​user_email", this.store_formData_2.field_email_id);
                            // localStorage.setItem("​​​user_id", this.userInsertedId);
                            // localStorage.setItem("​​​user_name", this.store_formData_2.user);
                            // localStorage.setItem("​​​profile_code", this.store_formData_2.​​​profile_code);
                            // localStorage.setItem("profile_flag", this.store_formData_2.profile_verify_flag ? this.store_formData_2.user_data[0].profile_verify_flag : 'N');
                            // localStorage.setItem("pay_name", 'Free');
                  
                            // this.router.navigate(['/profile_list']);

                            }else{
                            this.msgService.errorMsg('ES');

                            this.offRegestrationForm = true;
                            this.popupWindowAftreRegestra = false;

                            }
                  
                            });
            
                      // this.msgService.successMsg('SS')
                      }else{
                      // this.msgService.errorMsg('ES')
                      }
            
                      });
        
                
  
                // this.msgService.successMsg('SS')
                }else{
                // this.msgService.errorMsg('ES')
                }
  
                });
          
          }else{
          // this.msgService.errorMsg('ES')
          }
  
          });
          
        // this.msgService.successMsg('SS')
        }else{
        // this.msgService.errorMsg('ES')
        }

        });
    
        

    
  }

  // stateChange(e:any){
  //   this.cityList = this.locationData_dropdown.filter((dt:any) => dt.state == e.value)
  // }

  
  stateChange_ByCountry(e:any){
    // debugger
    
    this.form_step_2.controls.field_Country.setValue(this.countryList.filter(p=>p.name.toLowerCase()==e.option.value.toLowerCase())[0].id)
    this.service.global_service(0, '/master/states_list', `country_id=${this.form_step_2.controls.field_Country.value}`).subscribe((data:any) => {
      var responseData_State:any;
      responseData_State = data
      responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
      responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
      this.stateList = responseData_State;
      this.stateList = this.stateList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.filteredState = responseData_State 
      })
 
  }

  cityChange_ByState(e:any){
    this.form_step_2.controls.field_State.setValue(this.stateList.filter(p=>p.name.toLowerCase()==e.option.value.toLowerCase())[0].id)
    this.service.global_service(0, '/master/cities_list', `state_id=${this.form_step_2.controls.field_State.value}`).subscribe((data:any) => {
      var responseData_State:any;
      responseData_State = data
      responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
      responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
      this.cityList = responseData_State;
      this.cityList = this.cityList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      this.filteredCity = responseData_State
      })
 
  }
  mother_tongue_select(e:any){
    
    this.form_step_2.controls.field_mother_tong.setValue(this.lang_list.filter(p=>p.lang_name.toLowerCase()==e.option.value.toLowerCase())[0].id)
  }
  religion_select(e:any){
    this.form_step_3.controls.field_ur_religion.setValue(this.relData.filter(p=>p.name.toLowerCase()==e.option.value.toLowerCase())[0].value)
  }
  
  caste_select(e:any){
    this.form_step_3.controls.field_cast.setValue(this.caste_list.filter(p=>p.name.toLowerCase()==e.option.value.toLowerCase())[0].id)
  }
  // education_select(e:any){
  //   this.form_step_5.controls.field_highest_education.setValue(this.education.filter(p=>p.name.toLowerCase()==e.option.value.toLowerCase())[0].id)
 
  
  // }
  income_select(e:any){
    this.form_step_5.controls.field_Annual_Income.setValue(this.income_list.filter(p=>p.income.toLowerCase()==e.option.value.toLowerCase())[0].id)
  }
  

  wordCounter_250(event:any){
    
  
    if(event == 'about_you_text'){
    this.count_AboutYou = this.form_step_6.controls.field_About_us.value?.length;
    const inputString:any =this.form_step_6.controls.field_About_us.value?.length;
  
    if (inputString > 250) {
    this.isButtonDisabled = true;
     }
     else{
     this.isButtonDisabled = false;
    }
  }
  

  
  
   }
  


  terms_Condition_CheckBox(event:any){
    if(event.checked){
     this.ischecked_Terms_Condition= false
    }
    else{
    this.ischecked_Terms_Condition= true
    }
  }


  terms_Condition_CheckBox_2(event:any){
    if(event.checked){
     this.ischecked_Terms_Condition_2= false
    }
    else
    this.ischecked_Terms_Condition_2= true
  }

  
  
  edite(event:any){


    this.frmFlag = event;
    

  }



}
