import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { environment } from 'src/environments/environment';
import { user_basic_info, user_groom_loc } from 'src/app/Model/user_dtls';
import {MatChipInputEvent} from '@angular/material/chips';
// import { Observable, debounceTime, map, startWith } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Location } from '@angular/common';

declare let google: any;

@Component({
  selector: 'app-user_portfolio_edit',
  templateUrl: './user_portfolio_edit.component.html',
  styleUrls: ['./user_portfolio_edit.component.css']
})
export class User_portfolio_editComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  showOtpdiv= false
  fruits: string[] = [];
  hobId:any[]=[];
  selectedSports;

  birth_loc_name:any;
  birth_loc_lat:any;
  birth_loc_long:any;
  birth_loc_latlong:any;
  dob: string;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  constructor(private service:DataService, private router:Router, private msgService: MessageService, private datePipe: DatePipe, private sds:SecrectDataService, private location: Location) { 
    
  }

  showOtpComponent = true;
  otp:string
  generateOTP_btn = false;
  timerInt: any;
  display_new: any;
  showExpairMsg = true;
  showOtpMainBox = false;
  response_emailOtp:any
  response_update_email_flag:any
  getOTP: any;
  verifyBtnActive: any;
  updateEmail_data:any
  verifyBtn= false
  emailFlag :any
  emailFlagContact :any
  verify_email:any;
  isEmailExit = true;
  isEmaiAlrtTxt:any;


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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  // mobileNumberFrm = true;
  filteredHobby:any
  filteredSports:any

  isShowForm_1 = true;
  isShowForm_2 = true;
  isShowForm_3 = true;
  isShowForm_4 = true;
  isShowForm_5 = true;
  isShowForm_6 = true;
  isShowForm_7 = true;
  isShowForm_8 = true;
  isShowForm_9 = true;
  isShowForm_10 = true;


  // store_mobileNumber:any

  store_EditformData_1:any
  store_EditformData_2:any
  store_EditformData_3:any
  store_EditformData_4:any
  store_EditformData_5:any
  store_EditformData_6:any
  store_EditformData_7:any
  store_EditformData_8:any
  store_EditformData_9:any
  store_EditformData_10:any

  isButtonDisabled = false;

  locationData_dropdown:any;
  // Work_LocatioList:any;
  DOBList:any;
  caste_list:any;
  gothram_list:any;
  state_shorting = new Array();
  // state_shorting_2 = new Array();
  city_short_by_state = new Array();
  occupation_list:any;
  income_list:any;
  education:any;
  lang_list:any; 

  autocomplete:any;
  locationPlaces: any;

  // user_profile:any;
  user_basic_info:any;
  user_basic_info_New:user_basic_info;
  user_about:any;
  groomLoc_ProfInfo:any;
  groomLoc_ProfInfo_New:user_groom_loc;
  user_hobbi:any;
  // user_contact_details:any
  // user_contact_details_New:user_contact_details;

  newHobbiData:any
  hbArr:any
  count_hobbies: any =0;
  count_music: any =0;
  count_sports: any =0;
  count_movies: any =0;



  count_AboutMyFamily: any =0;
  count_AboutYou: any = 0;

  frm_Response_common:any;


  public inProgressShort: boolean = true;

  latt_long:any = ''


  form_step_1 = new FormGroup({
    field_About_us: new FormControl('',[Validators.required, Validators.maxLength(250)])
    // field_About_My_Family: new FormControl('', [Validators.required,Validators.maxLength(250)])
  });


  form_step_2 = new FormGroup({
    field_who_creat_profile: new FormControl('',[Validators.required]),
    field_name: new FormControl('',[Validators.required]),
    field_gender: new FormControl(''),
    field_body_type: new FormControl(''),
    field_disability: new FormControl(''),
    field_height: new FormControl(''),
    field_weight: new FormControl(''),
    field_mother_tong: new FormControl('', [Validators.required]),
    field_marital_status: new FormControl('',[Validators.required]),
    field_Eating_Habits: new FormControl(''),
    field_Drinking_Habits: new FormControl(''),
    field_Smoking_Habits: new FormControl('')
  });

  form_step_3 = new FormGroup({
    field_ur_religion: new FormControl('',[Validators.required]),
    field_cast: new FormControl('',[Validators.required]),
    // field_willing_marry_other_commun: new FormControl(false),
  });

  form_step_4 = new FormGroup({
    field_Country: new FormControl('',[Validators.required]),
    field_City: new FormControl(''),
    field_State: new FormControl('',[Validators.required])
    // field_Citizenship: new FormControl('',[Validators.required])
  });

  form_step_5 = new FormGroup({
    field_highest_education: new FormControl('',[Validators.required]),
    field_Education_Detail: new FormControl(''),
    field_College: new FormControl(''),
    field_Occupation: new FormControl('',[Validators.required]),
    field_Occupation_Detail: new FormControl(''),
    field_Organization: new FormControl(''),
    field_Annual_Income: new FormControl('',[Validators.required]),
    work_location: new FormControl(''),
    field_employed: new FormControl('')
  });

  form_step_6 = new FormGroup({
    field_family_value: new FormControl(''),
    field_family_type: new FormControl(''),
    field_family_status: new FormControl(''),
    field_Father_Occupation: new FormControl(''),
    field_Mother_Occupation: new FormControl(''),
    field_No_Brother: new FormControl(''),
    field_No_Sister: new FormControl(''),
    field_Family_Location: new FormControl('')
  });

  form_step_7 = new FormGroup({
    field_Hobbies_Interests: new FormControl('',[Validators.maxLength(250)]),
    field_Music: new FormControl('',[Validators.maxLength(250)]),
    field_Sports: new FormControl('',[Validators.maxLength(250)]),
    field_Preferred_Movies: new FormControl('',[Validators.maxLength(250)]),
    field_Spoken_Languages: new FormControl([]),
  });

  form_step_8 = new FormGroup({
    field_About_My_Family: new FormControl('', [Validators.required,Validators.maxLength(250)])
  });

  form_step_9 = new FormGroup({
    field_birth_date: new FormControl(''),
    field_age: new FormControl(''),
    field_birth_loca: new FormControl('', [Validators.required]),
  });

  form_step_10 = new FormGroup({
    field_mobile: new FormControl(''),
    field_email_id: new FormControl('',[Validators.required,Validators.email]),
  });

  ac_for_OBJ:any;
  // field_ur_religion_OBJ:any;
  field_family_value_OBJ:any;
  field_family_type_OBJ:any;
  field_family_status_OBJ:any;
  field_Father_Occupation_OBJ:any;
  field_Mother_Occupation_OBJ:any;
  field_No_Brother_OBJ:any;
  field_No_Sister_OBJ:any;
  field_Family_Location_OBJ:any;
  field_body_type_OBJ:any;
  field_disability_OBJ:any;
  field_height_OBJ:any;
  field_weight_OBJ:any;
  field_marital_status_OBJ:any;
  field_Eating_Habits_OBJ:any; 
  field_Drinking_Habits_OBJ:any;
  field_Smoking_Habits_OBJ:any;
  field_gender_OBJ:any;
  field_religion_OBJ:any;
  field_Religion_OBJ:any;
  field_Employed_in_OBJ:any; 
  field_field_Sports_OBJ:any;
  field_Preferred_Movies_OBJ:any;
  field_Spoken_Languages_OBJ:any;
  field_Music_OBJ:any;
  field_Hobbies_Interests_OBJ:any;
  field_country_OBJ:any;
  
  age:any;
  showAge:any;

  localstorageDT:any;
  verifyEmail_data:any

  selected:any;

  imageBaseUrl:any;
  // loded_single_img:any;
  // listOfFiles_single: any[] = [];

  dropdownList:any;

  countryList = new Array();
  stateList = new Array();
  cityList = new Array();

  hobbies_list:any;
  langList:any;
  favoriteMusicList:any;
  sportsList:any;
  preferedMovieList:any;

  workLocation: Observable<any>;
  
  accTypeAftPay:any;

  getLocalSecrectUrl= this.sds.getLocalSecrectData();


  ngOnInit() {
    this.accTypeAftPay = this.getLocalSecrectUrl.data.pay_name;
    

  //  this.localstorageDT = {
  //   id:localStorage.getItem("id"),
  //   profile_id:localStorage.getItem("​​​profile_code"),
  //   ​​​user_name:localStorage.getItem("​​​user_name")
  //  }

     this.localstorageDT = {
    id: this.getLocalSecrectUrl.data.id,
    profile_id: this.getLocalSecrectUrl.data.​​​profile_code,
    ​​​user_name: this.getLocalSecrectUrl.data.​​​user_name
   }
 

  this.field_height_OBJ = dynamic_data.field_height;

  this.ac_for_OBJ = dynamic_data.ac_for;

  this.field_gender_OBJ = dynamic_data.field_gender;
  
  this.field_Religion_OBJ = dynamic_data.field_Religion;
  
  this.field_weight_OBJ = dynamic_data.field_weight;
  
  this.field_body_type_OBJ = dynamic_data.field_body_type;
  
  this.field_marital_status_OBJ = dynamic_data.field_marital_status;
  
  this.field_disability_OBJ = dynamic_data.field_disability;
  
  this.field_Eating_Habits_OBJ = dynamic_data.field_Eating_Habits;
  
  this.field_Drinking_Habits_OBJ = dynamic_data.field_Drinking_Habits;
  
  this.field_Smoking_Habits_OBJ = dynamic_data.field_Smoking_Habits;
  
  this.field_country_OBJ = dynamic_data.field_country;
  
  this.field_Employed_in_OBJ = dynamic_data.field_Employed_in;
  
  this.field_Father_Occupation_OBJ = dynamic_data.field_Father_Occupation;
  
  this.field_Mother_Occupation_OBJ = dynamic_data.field_Mother_Occupation;
  
  this.field_family_value_OBJ = dynamic_data.field_family_value;
  this.field_family_type_OBJ = dynamic_data.field_family_type;
  this.field_No_Brother_OBJ = dynamic_data.field_No_Brother;
  
  this.field_family_status_OBJ = dynamic_data.field_family_status;
  this.field_No_Sister_OBJ = dynamic_data.field_No_Sister;
  this.field_Family_Location_OBJ = dynamic_data.field_Family_Location;
  
  this.field_Hobbies_Interests_OBJ = dynamic_data.field_Hobbies_Interests;
  this.field_Music_OBJ = dynamic_data.field_Music;
  this.field_field_Sports_OBJ = dynamic_data.field_field_Sports;
  
  this.field_Preferred_Movies_OBJ = dynamic_data.field_Preferred_Movies;
  
  this.field_Spoken_Languages_OBJ = dynamic_data.field_Spoken_Languages;
 

    // this.service.global_service(0, '/master/location_list', null).subscribe((data:any) => {
    //   var responseData:any;
    //   responseData = data
    //   responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    //   this.locationData_dropdown = responseData ? JSON.parse(responseData) : 'Error occures in API';

  
    //   this.locationData_dropdown.forEach((item:any)=> {
        

    //     var existing = this.state_shorting.filter(function(v:any, i:any) {
    //       return v.name == item.name;
    //     });
        
    //     if (!existing.length) {
    //     this.state_shorting.push(item);
        
    //     }
    //   });
    //   })


      // this.service.global_service(0, '/master/cities_list', null).subscribe((data:any) => {
      //   var responseData:any;
      //   responseData = data
      //   responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      //   this.DOBList = responseData ? JSON.parse(responseData) : 'Error occures in API'
  
      //   var dt = JSON.parse(responseData)
  
        /***** SUMAN MITRA  */
        // this.filteredLoc = this.form_step_2.controls.field_birth_loca.valueChanges.pipe(
        //   startWith(''),
        //   map(state => (state ? this._filterStates(state) : this.DOBList.slice())),
        // );
  
        // this.workLocation = this.form_step_5.controls.work_location.valueChanges.pipe(
        //   startWith(''),
        //   map(state => (state ? this._filterStates(state) : this.DOBList.slice())),
        // );
  
  
        /*** END */
        
        // })


      // this.service.global_service(0, '/master/cities_list', null).subscribe((data:any) => {
      //   var responseData:any;
      //   responseData = data
      //   responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      //   this.DOBList = responseData ? JSON.parse(responseData) : 'Error occures in API'
  
      //   })

        // this.DOBList = JSON.parse(localStorage.getItem('DOBList'));
        

      this.service.global_service(0, '/master/countries_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
        this.countryList = responseData;
        })


      this.service.global_service(0, '/master/lang_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
        this.langList = responseData;
        
        })  

      this.service.global_service(0, '/master/hobbies_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
        this.hobbies_list = responseData;
        this.filteredHobby = this.hobbies_list
        
        })

        this.service.global_service(0, '/master/music_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
        this.favoriteMusicList = responseData;
        
        })
        
        this.service.global_service(0, '/master/sports_list',`sports=${this.form_step_7.controls.field_Sports.value}`).subscribe((data:any) => {
          var responseData:any;
          responseData = data
          responseData = responseData.suc > 0 ? atob(responseData.msg) : false
          responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
          this.sportsList = responseData;
          this.filteredSports= this.sportsList
          
          })

          this.service.global_service(0, '/master/movie_list', null).subscribe((data:any) => {
            var responseData:any;
            responseData = data
            responseData = responseData.suc > 0 ? atob(responseData.msg) : false
            responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
            this.preferedMovieList = responseData;
            })

  
      this.service.global_service(0, '/master/caste_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.caste_list = JSON.parse(responseData)
      })
  
      this.service.global_service(0, '/master/occupation_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.occupation_list = JSON.parse(responseData);
      })
  
      this.service.global_service(0, '/master/income_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.income_list = JSON.parse(responseData)
      })
  
      this.service.global_service(0, '/master/lang_list', `lang_list=${this.form_step_7.controls.field_Spoken_Languages.value}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.lang_list = JSON.parse(responseData)
      })
  
      this.service.global_service(0, '/master/education', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.education = JSON.parse(responseData)
      })
      
  
      this.service.global_service(0, '/master/gothram_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  
      this.gothram_list = JSON.parse(responseData)
      
      })

      this.imageBaseUrl = environment.api_url + '/uploads/';

        this.get_Family_DetailsDtls();
        this.get_GroomLocation_ProfInfoDtls();
        this.get_Hobbies_Dtls();
        // this.get_Single_Photo();
        this.get_contact_details();

      // END //
      // this.initForm();
  }  
  
  goBack(): void {
    this.location.back();
  }

  gotoViewProfile(userId:any){
    this.router.navigate(['/user/portfolio_view', btoa(userId)]);
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
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
  resendOTP() {
    alert()
    // this.form_user_phone_send.controls.optField.reset();
    this.ngOtpInput.setValue('');
    this. verifyEmail();
    this.timer_new(5);

  }

  verifyEmail(){
    
    this.verifyEmail_data = {
      user_name: this.localstorageDT.user_name,
      profile_id: this.localstorageDT.profile_id,
      email_id:  this.user_basic_info_New.email_id 
     }
     
     this.updateEmail_data = {
      user_id: this.localstorageDT.id,
      user_name: this.localstorageDT.user_name,   
     }

  // this.showOtpMainBox = true;
  this.generateOTP_btn = true;
  this.service.global_service(1, '/profile/verify_email', {data: btoa(JSON.stringify(this.verifyEmail_data))}).subscribe(data=>{
    this.response_emailOtp = data;
    if(this.response_emailOtp.suc > 0){
      // this.getOTP = this.response_emailOtp.otp;
      this.getOTP = this.sds.decrypt(this.response_emailOtp.otp);
      
      this.timer_new(5);
    }
    

  })
    
  }


  onOtpChange(otp) {
    this.otp = otp;

    if (this.otp.length == 4) {
      if (this.getOTP == this.otp) {
        this.verifyBtnActive = true;
        // alert('match otp')
        this.service.global_service(1, '/profile/update_email_flag',this.updateEmail_data).subscribe(data=>{
          this.response_update_email_flag = data;
          // if(this.response_update_email_flag.suc > 0){
          //   this.verifyBtn=true
          // }
          // else{
          //   this.verifyBtn=false

          // }
          
        })
      } else {
        // alert('not match otp')
        this.verifyBtnActive = false;
        this.msgService.errorMsg('OTP_NOT_MAT')
      }
    } else {
      this.verifyBtnActive = false;
    }

  }
  onclickcheck(otp){
    this.onOtpChange(otp);
    this.generateOTP_btn = false;
    
    if(this.response_update_email_flag.suc > 0){
        this.verifyBtn=true
      }
      else{
        this.verifyBtn=false

      }
  }




  // initForm(){
  //   this.form_step_7.get('field_Hobbies_Interests').valueChanges.subscribe(response =>{
  //     console.log(response, 'responseresponse');
  //     this.filterDataHobby(response);
  //   })
  //   this.form_step_7.get('field_Sports').valueChanges.subscribe(response =>{
  //     this.filterDataSports(response);
  //   })
  // }

  //   filterDataHobby(enteredHobby){
  //     console.log(enteredHobby, 'enteredHobbyenteredHobbyenteredHobby');
      
  //     this.filteredHobby = this.hobbies_list.filter(item=>{
  //       return item.hobby.toLowerCase().indexOf(enteredHobby.toLowerCase()) > -1
  //     })
  //   }
  //   filterDataSports(enteredSports){
  //     this.filteredSports = this.sportsList.filter(item=>{
  //       return item.sports.toLowerCase().indexOf(enteredSports.toLowerCase()) > -1
  //     })
  //   }


    // ngAfterViewInit(){
    //     this.form_step_7.get('field_Sports1')
    //     .valueChanges
    //     .pipe(
    //       // tap(() => (this.__isEuinSpinner = true)), //For Loader
    //       debounceTime(200),
    //       distinctUntilChanged(),
    //       switchMap((dt) =>
    //         dt.length > 2 ?
    //         this.service.global_service(0, '/master/sports_list','sports_id='+dt) : []
    //       ),
    //       // map((x:{suc:number,msg:string,data}) => x.data)
    //       //  x.suc > 0 ? JSON.parse(atob(x.data)) : []
    //     )
    //     .subscribe(res =>{
    //       //  this.filteredSports = res;
    //     })
    // }


  getLocationList(){
    // Google API //
    const input = document.getElementById('location') as HTMLInputElement;
    if(this.latt_long != '')
      this.autocomplete = new google.maps.places.Autocomplete(input, {location: this.latt_long});
    else
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

onChangeState(event:any) {
  
  this.city_short_by_state = this.locationData_dropdown.filter((dt:any) => dt.state == event);
}





  public getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }


  toggleDisplayForm(frm_1:any) {
    if(frm_1 == 1){
      this.isShowForm_1 = !this.isShowForm_1;
    } else {
      this.isShowForm_1 = true;
    }

    if(frm_1 == 2){
      this.isShowForm_2 = !this.isShowForm_2;
    } else {
      this.isShowForm_2 = true;
    }

    if(frm_1 == 3){
      this.isShowForm_3 = !this.isShowForm_3;
    } else {
      this.isShowForm_3 = true;
    }

    if(frm_1 == 4){
      this.isShowForm_4 = !this.isShowForm_4;
    } else {
      this.isShowForm_4 = true;
    }

    if(frm_1 == 5){
      this.isShowForm_5 = !this.isShowForm_5;
    } else {
      this.isShowForm_5 = true;
    }

    if(frm_1 == 6){
      this.isShowForm_6 = !this.isShowForm_6;
    } else {
      this.isShowForm_6 = true;
    }

    if(frm_1 == 7){
      this.isShowForm_7 = !this.isShowForm_7;
    } else {
      this.isShowForm_7 = true;
    }

    if(frm_1 == 8){
      this.isShowForm_8 = !this.isShowForm_8;
    } else {
      this.isShowForm_8 = true;
    }

    if(frm_1 == 9){
      this.isShowForm_9 = !this.isShowForm_9;
       // Google API //
       this.getLocationList();
    } else {
      this.isShowForm_9 = true;
    }
    if(frm_1 == 10){
      this.isShowForm_10 = !this.isShowForm_10;
    }else {
      this.isShowForm_10 = true;
    }

    // this.count_hobbies=this.user_basic_info[0]?.hobbies_int?.length;
    this.count_AboutYou=this.user_basic_info[0]?.about_us?.length;
    this.count_AboutMyFamily=this.user_basic_info[0]?.about_my_family?.length;

  }

  closeEditePopup(){
    document.getElementById('popup_Id').classList.remove('popupAnimated_Edite_Active');
  }

  edit_saveForm_1(){

    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    // this.popupWindowAftreRegestra = false;

    this.isShowForm_1 = true;

    this.store_EditformData_1 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      // field_About_us: this.form_step_1.controls.field_About_us.value,
      // field_About_us:this.form_step_1.controls.field_About_us.value.replace(/'/g,"\\'")
      field_About_us:this.form_step_1.controls.field_About_us.value.split('"').join(''),
      edite_Flag:2,
      timeStamp: new Date().getTime()

    }
    
    
    this.submit_About_usDtls();

  }



  submit_About_usDtls(){
    this.frm_Response_common = '';
    this.service.global_service(1, '/user/user_about', {data: btoa(JSON.stringify(this.store_EditformData_1))}).subscribe(data=>{
      this.frm_Response_common = data;
  
      if(this.frm_Response_common.suc > 0){
        
        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }






  edit_saveForm_2(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    this.isShowForm_2 = true;
    this.store_EditformData_2 = {
    user_id: this.localstorageDT.id,
    user: this.localstorageDT.user_name,
    field_who_creat_profile: this.form_step_2.controls.field_who_creat_profile.value != '' ? this.form_step_2.controls.field_who_creat_profile.value : this.user_basic_info[0]?.ac_for,
    // field_name: this.form_step_2.controls.field_name.value != '' ? this.form_step_2.controls.field_name.value : this.user_basic_info[0]?.u_name,
    field_gender: this.form_step_2.controls.field_gender.value != '' ? this.form_step_2.controls.field_gender.value : this.user_basic_info[0]?.gender,
    field_body_type: this.form_step_2.controls.field_body_type.value != '' ? this.form_step_2.controls.field_body_type.value : this.user_basic_info[0]?.body_type,
    field_disability: this.form_step_2.controls.field_disability.value != '' ? this.form_step_2.controls.field_disability.value : this.user_basic_info[0]?.disability_flag,
    field_height: this.form_step_2.controls.field_height.value != '' ? this.form_step_2.controls.field_height.value :  this.user_basic_info[0]?.height,
    field_weight: this.form_step_2.controls.field_weight.value != '' ? this.form_step_2.controls.field_weight.value : this.user_basic_info[0]?.weight,
    field_mother_tong: this.form_step_2.controls.field_mother_tong.value != '' ? this.form_step_2.controls.field_mother_tong.value : this.user_basic_info[0]?.mother_tong_id,
    field_marital_status: this.form_step_2.controls.field_marital_status.value != '' ? this.form_step_2.controls.field_marital_status.value : this.user_basic_info[0]?.marital_status,
    field_Eating_Habits: this.form_step_2.controls.field_Eating_Habits.value != '' ? this.form_step_2.controls.field_Eating_Habits.value : this.user_basic_info[0]?.eating_habbits,
    field_Drinking_Habits: this.form_step_2.controls.field_Drinking_Habits.value != '' ? this.form_step_2.controls.field_Drinking_Habits.value : this.user_basic_info[0]?.drinking_habbits,
    field_Smoking_Habits: this.form_step_2.controls.field_Smoking_Habits.value != '' ? this.form_step_2.controls.field_Smoking_Habits.value : this.user_basic_info[0]?.smoking_habbits,
    edite_Flag:4,
    timeStamp: new Date().getTime()
    }

    
    this.submit_Basic_DetailsDtls();
  }

 

  submit_Basic_DetailsDtls(){
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/user_basic_info', {data: btoa(JSON.stringify(this.store_EditformData_2))}).subscribe(data=>{
      this.frm_Response_common = data;
      if(this.frm_Response_common.suc > 0){
        
      
        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
       
      }else{
        this.msgService.errorMsg('ES')
      }
      });

      
    
  }



  edit_saveForm_3(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');

    this.isShowForm_3 = true;
    this.store_EditformData_3 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      field_ur_religion: this.form_step_3.controls.field_ur_religion.value != '' ? this.form_step_3.controls.field_ur_religion.value : this.user_basic_info[0]?.religion,
      field_cast: this.form_step_3.controls.field_cast.value != '' ? this.form_step_3.controls.field_cast.value : this.user_basic_info[0].caste_id,
      edite_Flag:6,
      timeStamp: new Date().getTime()
    }

    this.submit_ReligionInformationDtls()
  }
  

 
  

  submit_ReligionInformationDtls(){
    
    this.frm_Response_common = '';
    this.service.global_service(1, '/user/user_caste', {data: btoa(JSON.stringify(this.store_EditformData_3))}).subscribe(data=>{
      this.frm_Response_common = data;
      if(this.frm_Response_common.suc > 0){
        
        
        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }


  edit_saveForm_4(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    this.isShowForm_4 = true;
    this.store_EditformData_4 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      field_Country: this.form_step_4.controls.field_Country.value != '' ? this.form_step_4.controls.field_Country.value : this.user_basic_info_New?.country_id,
      field_City: this.form_step_4.controls.field_City.value != '' ? this.form_step_4.controls.field_City.value : this.user_basic_info_New?.city_id.toString(),
      field_State: this.form_step_4.controls.field_State.value != '' ? this.form_step_4.controls.field_State.value : this.user_basic_info_New?.state_id.toString(),
      edite_Flag:7,
      timeStamp: new Date().getTime()
    }

    this.submit_GroomLocationDtls()
  }

  submit_GroomLocationDtls(){
    
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/user_groom_loc', {data: btoa(JSON.stringify(this.store_EditformData_4))}).subscribe(data=>{
      this.frm_Response_common = data;
      if(this.frm_Response_common.suc > 0){
        
        this.form_step_4.reset();

        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }

  edit_saveForm_5(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    this.isShowForm_5 = true;
    this.store_EditformData_5 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      field_highest_education: this.form_step_5.controls.field_highest_education.value != '' ?  this.form_step_5.controls.field_highest_education.value : this.groomLoc_ProfInfo_New?.heigh_education,
      field_Education_Detail: this.form_step_5.controls.field_Education_Detail.value != '' ? this.form_step_5.controls.field_Education_Detail.value : this.groomLoc_ProfInfo_New?.edu_in_dtls,
      // field_College: this.form_step_5.controls.field_College.value != '' ? this.form_step_5.controls.field_College.value : this.groomLoc_ProfInfo_New?.collage,
      field_College: this.form_step_5.controls.field_College.value.split('"').join(''),

      field_Occupation: this.form_step_5.controls.field_Occupation.value != '' ? this.form_step_5.controls.field_Occupation.value : this.groomLoc_ProfInfo_New?.occup,
      field_Occupation_Detail: this.form_step_5.controls.field_Occupation_Detail.value != '' ? this.form_step_5.controls.field_Occupation_Detail.value : this.groomLoc_ProfInfo_New?.occup_in_dtls,
      // field_Organization: this.form_step_5.controls.field_Organization.value != '' ? this.form_step_5.controls.field_Organization.value : this.groomLoc_ProfInfo_New?.org_name,
      field_Organization: this.form_step_5.controls.field_Organization.value.split('"').join(''),

      field_Annual_Income: this.form_step_5.controls.field_Annual_Income.value != '' ? this.form_step_5.controls.field_Annual_Income.value : this.groomLoc_ProfInfo_New?.income,
      work_location: this.form_step_5.controls.work_location.value.split('"').join(''),
      field_employed: this.form_step_5.controls.field_employed.value != '' ? this.form_step_5.controls.field_employed.value : this.groomLoc_ProfInfo_New?.emp_type,
      edite_Flag:8,
      timeStamp: new Date().getTime()
    }


    this.submit_ProfInfoDtls()
  }

  submit_ProfInfoDtls(){
    
    
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/user_prof_info', {data: btoa(JSON.stringify(this.store_EditformData_5))}).subscribe(data=>{
      this.frm_Response_common = data;
      
      if(this.frm_Response_common.suc > 0){

        this.get_GroomLocation_ProfInfoDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }

  edit_saveForm_6(){

    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');

    this.isShowForm_6 = true;
    this.store_EditformData_6 = {
      user_id:this.localstorageDT.id,
      user:this.localstorageDT.user_name,
      field_family_value:this.form_step_6.controls.field_family_value.value != '' ? this.form_step_6.controls.field_family_value.value : this.user_basic_info_New?.family_values,
      field_family_type:this.form_step_6.controls.field_family_type.value != '' ? this.form_step_6.controls.field_family_type.value : this.user_basic_info_New?.family_type,
      field_family_status:this.form_step_6.controls.field_family_status.value != '' ? this.form_step_6.controls.field_family_status.value : this.user_basic_info_New?.family_status,
      field_Father_Occupation:this.form_step_6.controls.field_Father_Occupation.value,
      field_Mother_Occupation:this.form_step_6.controls.field_Mother_Occupation.value, 
      field_No_Brother: +this.user_basic_info_New?.no_brother > 0 ? (this.form_step_6.controls.field_No_Brother.value != '' ? this.form_step_6.controls.field_No_Brother.value : this.user_basic_info_New?.no_brother) : (+this.form_step_6.controls.field_No_Brother.value > 0 ? this.form_step_6.controls.field_No_Brother.value : 0),
      // field_No_Sister:this.form_step_6.controls.field_No_Sister.value != '' ? this.form_step_6.controls.field_No_Sister.value : this.user_basic_info_New?.no_sister,
      field_No_Sister: +this.user_basic_info_New?.no_sister > 0 ? (this.form_step_6.controls.field_No_Sister.value != '' ? this.form_step_6.controls.field_No_Sister.value : this.user_basic_info_New?.no_sister) : (+this.form_step_6.controls.field_No_Sister.value > 0 ? this.form_step_6.controls.field_No_Sister.value : 0),

      field_Family_Location:this.form_step_6.controls.field_Family_Location.value != '' ? this.form_step_6.controls.field_Family_Location.value : this.user_basic_info_New?.family_location,
      edite_Flag:9,
      timeStamp: new Date().getTime()
    }


    this.submit_Family_DetailsDtls();
  }


  submit_Family_DetailsDtls(){
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/family_dtls', {data: btoa(JSON.stringify(this.store_EditformData_6))}).subscribe(data=>{
      this.frm_Response_common = data;
  
      if(this.frm_Response_common.suc > 0){
        

        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }

  get_GroomLocation_ProfInfoDtls(){
    this.inProgressShort = true; 
    this.service.global_service(0, '/profile/user_groom_loc', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.groomLoc_ProfInfo = JSON.parse(responseData);
      this.groomLoc_ProfInfo_New = JSON.parse(responseData)[0];
      this.inProgressShort = false; 
      

      // if(this.user_basic_info_New?.state){
      //   this.onChangeState(this.user_basic_info_New?.state)
      // }

      this.form_step_4.patchValue({
        // field_Country: this.user_basic_info_New?.country_id,
        // field_State: this.user_basic_info_New?.state_id.toString()
      })
      
      this.form_step_5.patchValue({
        field_highest_education: this.groomLoc_ProfInfo_New?.heigh_education,
        field_Education_Detail: this.groomLoc_ProfInfo_New?.edu_in_dtls,
        // field_College: this.groomLoc_ProfInfo_New?.collage,
        field_Occupation: this.groomLoc_ProfInfo_New?.occup,
        field_Occupation_Detail: this.groomLoc_ProfInfo_New?.occup_in_dtls,
        // field_Organization: this.groomLoc_ProfInfo_New?.org_name,
        field_Annual_Income: this.groomLoc_ProfInfo_New?.income,
        work_location: this.groomLoc_ProfInfo_New?.work_location,
        field_employed: this.groomLoc_ProfInfo_New?.emp_type
      })
      // this.form_step_9.patchValue ({
      //   field_birth_date: 
      //   field_age:
      //   field_birth_loca: 
      // });

      })
  }







  edit_saveForm_7(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    this.isShowForm_7 = true;
    this.store_EditformData_7 = {
      user: this.localstorageDT.user_name,
      user_id: this.localstorageDT.id,
      // field_ur_religion: this.form_step_3.controls.field_ur_religion.value != '' ? this.form_step_3.controls.field_ur_religion.value : this.user_basic_info[0]?.religion,
      field_hobbies_interest: this.form_step_7.controls.field_Hobbies_Interests.value != '' ? this.form_step_7.controls.field_Hobbies_Interests?.value?.split('"').join('') : this.user_basic_info.hobbies_interest,
      field_fav_music: this.form_step_7.controls.field_Music?.value != ''? this.form_step_7.controls.field_Music?.value?.split('"').join('') : this.user_basic_info.field_Music,
      field_sports: this.form_step_7.controls.field_Sports?.value != ''? this.form_step_7.controls.field_Sports?.value?.split('"').join('') : this.user_basic_info.field_Sports,
      field_movie: this.form_step_7.controls.field_Preferred_Movies?.value != ''?  this.form_step_7.controls.field_Preferred_Movies?.value?.split('"').join('') : this.user_basic_info.field_m,



      // field_hobbies_interest: this.form_step_7.controls.field_Hobbies_Interests?.value.length < 1 ? null : this.form_step_7.controls.field_Hobbies_Interests?.value?.split('"').join(''),
      // field_fav_music: this.form_step_7.controls.field_Music?.value.length < 1 ? null : this.form_step_7.controls.field_Music?.value?.split('"').join(''),
      // field_sports: this.form_step_7.controls.field_Sports?.value.length < 1 ? null : this.form_step_7.controls.field_Sports?.value?.split('"').join(''),
      // field_movie: this.form_step_7.controls.field_Preferred_Movies?.value?.split('"').join(''),
      // field_movie: this.form_step_7.controls.field_Preferred_Movies?.value.length < 1 ? null :  this.form_step_7.controls.field_Preferred_Movies?.value?.split('"').join(''),

      // this.store_formData_2.profile_verify_flag ? this.store_formData_2.user_data[0].profile_verify_flag : 'N'
      // field_Spoken_Languages: this.form_step_7.controls.field_Spoken_Languages.value,
      edite_Flag:10,
      timeStamp: new Date().getTime()
    }
    // console.log(this.store_EditformData_7,'hobby')


   this.submit_HobbiesDtls();
  }


  
  isOptionDisabled_min5(opt: any, field:any){

    return this.form_step_7.get(field).value.length >= 5 && !this.form_step_7.get(field).value.find(el => el == opt)
  }

  // isOptionDisabled_min1(opt: any, field:any){
  //   return this.form_step_7.get(field).value.length >= 1 && !this.form_step_7.get(field).value.find(el => el == opt)
  // }
  


  submit_HobbiesDtls(){
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/update_hobby', {data: btoa(JSON.stringify(this.store_EditformData_7))}).subscribe(data=>{
      this.frm_Response_common = data;
      
      
      
     

      if(this.frm_Response_common.suc > 0){

        this.get_Hobbies_Dtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }

  get_Hobbies_Dtls(){
    this.inProgressShort = true; 
    this.service.global_service(0, '/profile/hobby', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false;
      this.user_hobbi = JSON.parse(responseData)
      this.user_hobbi = this.user_hobbi[0];
      this.inProgressShort = false;
      

// user_hobbi[]

      // var hobbi_fields = [
      //   {field_name: 'field_Hobbies_Interests', select_value: 'hobbies_interest'},
      //   {field_name: 'field_Music', select_value: 'music_name'},
      //   {field_name: 'field_Preferred_Movies', select_value: 'movie_name'},
      //   {field_name: 'field_Spoken_Languages', select_value: 'lang_id'},
      //   {field_name: 'field_Sports', select_value: 'sports_name'},
      // ]
      // this.newHobbiData = {}
      // // this.hbArr = this.user_hobbi.field_Hobbies_Interests.map((dt:any) => dt.hobbies_interest);
      // for(let dt of hobbi_fields){
      //     // this.newHobbiData[dt.field_name] = this.user_hobbi[dt.field_name].length > 0 ? this.user_hobbi[dt.field_name].map((mdt:any) => mdt[dt.select_value]) : null
      //   /**** SUMAN MITRA */
      //     this.newHobbiData[dt.field_name] = this.user_hobbi[dt.field_name].length > 0 ? this.user_hobbi[dt.field_name].map((mdt:any) => mdt[dt.select_value]) : []
      //   /*** END */
      // }
      this.form_step_7.patchValue({
        // field_Hobbies_Interests: this.user_hobbi?.hobbies_interest,
        // field_Music: this.user_hobbi?.fav_music,
        // field_Sports: this.user_hobbi?.sports,
        // field_Preferred_Movies: this.user_hobbi?.movie,
        field_Hobbies_Interests: this.user_hobbi?.hobbies_interest != '' && this.user_hobbi?.hobbies_interest != 'undefined' ? this.user_hobbi?.hobbies_interest : '',
        field_Music: this.user_hobbi?.fav_music != '' && this.user_hobbi?.fav_music != 'undefined' ? this.user_hobbi?.fav_music : '',
        field_Sports: this.user_hobbi?.sports!= '' && this.user_hobbi?.sports != 'undefined' ? this.user_hobbi?.sports : '',
        field_Preferred_Movies: this.user_hobbi?.movie != '' && this.user_hobbi?.movie != 'undefined' ? this.user_hobbi?.movie : '',

      
      })

    })
  }

  insertUniqueValue(value) {
    if (this.hobId.includes(value)) {
      this.hobId.push(value);
    } else {

    }
  }
//   hobbies_interest(e:any){
//     if(this.hobId.length>=5){
//       alert("Hiiii")
//       return
//           }
//     else{
//       debugger
//       const value = (e.option.value || '').trim();
//     if (value) {
//       if(!this.hobId.includes(value)){
      
//         debugger
//         this.fruits.push(value);
//         this.form_step_7.controls.field_Hobbies_Interests1.setValue(null);
//         const hobid=this.hobbies_list.filter(p=>p.hobby.toLowerCase()==e.option.value.toLowerCase())[0].id
//       this.hobId.push(hobid);
//       this.form_step_7.controls.field_Hobbies_Interests.setValue(this.hobId);
//       }
//       else{
// alert
// ("hiii");
// return
//       }
      
      

//     }
    
  
//     debugger
//       debugger
//     }
    
//   }
  sports_select(e:any){
    this.form_step_7.controls.field_Sports.setValue(this.sportsList.filter(p=>p.sports.toLowerCase()==e.option.value.toLowerCase())[0].id)
  }

  edit_saveForm_8(){
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
    this.isShowForm_8 = true;
    this.store_EditformData_8 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      // field_About_My_Family: this.form_step_8.controls.field_About_My_Family.value != '' ? this.form_step_8.controls.field_About_My_Family.value : this.user_basic_info[0]?.about_my_family,
      field_About_My_Family: this.form_step_8.controls.field_About_My_Family.value.split('"').join(''),
      edite_Flag:11,
      timeStamp: new Date().getTime()

    }

    this.submit_About_My_FamilyDtls()
  }

  edit_saveForm_9(){

    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');

    this.isShowForm_9 = true;
    this.store_EditformData_9 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      field_birth_date: this.form_step_9.controls.field_birth_date.value != '' ? this.form_step_9.controls.field_birth_date.value : this.datePipe.transform(this.user_basic_info[0]?.dob.toString(),'yyyy-MM-dd h:mm:ss'),
      field_age: this.showAge,
      latt_long: this.birth_loc_latlong,
      location_id: this.birth_loc_name,
      edite_Flag:3,
      timeStamp: new Date().getTime()
    }

    this.service.global_service(1, '/user/birth_details', {data: btoa(JSON.stringify(this.store_EditformData_9))}).subscribe(data => {
      this.frm_Response_common = data;
  
      if(this.frm_Response_common.suc > 0){
        
        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
    })


  }
  email_verify(event:any){
    this.service.global_service(0, '/profile/check_email', `email_id=${this.form_step_10.controls.field_email_id.value}`).subscribe((data:any) => {
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
  
  edit_saveForm_10(){
    this.service.global_service(0, '/profile/check_email', `email_id=${this.form_step_10.controls.field_email_id.value}`).subscribe((data:any) => {
      this.verify_email = data;
  
      if(this.verify_email.suc === 1){
        // this.msgService.successMsg('EMAIL_ACCEPT')
        document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');
        this.isShowForm_10 = true;
        this.service.global_service(1, '/profile/user_contact_details', {data: btoa(JSON.stringify(this.store_EditformData_10))}).subscribe(data => {
      
          this.frm_Response_common = data;
          // console.log( this.frm_Response_common,'email');
          
         
          if (this.frm_Response_common.suc > 0){
            this.get_Family_DetailsDtls();
            this.msgService.successMsg('SS')
          }else {
            this.msgService.errorMsg('ES')
          }
        })
        this.isEmailExit = false;
        this.isEmaiAlrtTxt = ""
      }
  
      if(this.verify_email.suc === 2){
  
        // this.msgService.errorMsg('EMAIL_EXIT')
        this.isEmailExit = true;
        this.isEmaiAlrtTxt = this.verify_email.msg
        
      }
      
      })
 //change 

   
    this.store_EditformData_10 = {
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      field_mobile: this.form_step_10.controls.field_mobile.value != '' ? this.form_step_10.controls.field_mobile.value : this.user_basic_info_New[0]?.phone_no,
      field_email_id: this.form_step_10.controls.field_email_id.value != '' ? this.form_step_10.controls.field_email_id.value : this.user_basic_info_New[0]?.email_id,
      edite_Flag:5,
      timeStamp: new Date().getTime()
    }

    
    // this.service.global_service(1, '/profile/user_contact_details', {data: btoa(JSON.stringify(this.store_EditformData_10))}).subscribe(data => {
      
    //   this.frm_Response_common = data;
     
    //   if (this.frm_Response_common.suc > 0){
    //     this.get_Family_DetailsDtls();
    //     this.msgService.successMsg('SS')
    //   }else {
    //     this.msgService.errorMsg('ES')
    //   }
    // })
  }


  submit_About_My_FamilyDtls(){
    this.frm_Response_common = '';
    this.service.global_service(1, '/profile/about_family', {data: btoa(JSON.stringify(this.store_EditformData_8))}).subscribe(data=>{
      this.frm_Response_common = data;
  
      if(this.frm_Response_common.suc > 0){
        
        this.get_Family_DetailsDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }


  get_Family_DetailsDtls(){
    this.inProgressShort = true;
    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.user_basic_info = JSON.parse(responseData)
      this.user_basic_info_New = JSON.parse(responseData)[0];
      this.emailFlag = JSON.parse(responseData)[0].email_approved_flag

      // localStorage.setItem("​​​​​​user_email", this.user_basic_info_New?.email_id);
      this.sds.setLocalSecrectData({​​​​​​user_email: this.user_basic_info_New?.email_id})

      this.inProgressShort = false;
      
      if(this.emailFlag == 'Y'){
        this.verifyBtn=true
      }
      else{
        this.verifyBtn=false

      }

      
      
      


      this.latt_long = this.user_basic_info_New?.latt_long;
      this.age = this.datePipe.transform(this.user_basic_info_New?.dob, 'yyyy-MM-dd');
      if(this.age){
        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        // this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
      }
      


      // edit_saveForm_1(){
      //   this.isShowForm_1 = true;
    
      //   this.store_EditformData_1 = {
      //     user_id: this.localstorageDT.id,
      //     user: this.localstorageDT.user_name,
      //     field_About_us: this.form_step_1.controls.field_About_us.value,
      //   }
        
    
      //   this.submit_About_usDtls();
    
      // }

      this.form_step_1.patchValue({
        field_About_us: this.user_basic_info_New?.about_us
      })





      this.form_step_6.patchValue({
        field_family_value: this.user_basic_info_New?.family_values,
        field_family_type: this.user_basic_info_New?.family_type,
        field_family_status: this.user_basic_info_New?.family_status,
        field_Father_Occupation: this.user_basic_info_New?.father_occupation,
        field_Mother_Occupation: this.user_basic_info_New?.mother_occupation,
        field_No_Brother: this.user_basic_info_New?.no_brother,
        field_No_Sister: this.user_basic_info_New?.no_sister,
        field_Family_Location: this.user_basic_info_New?.family_location,
      })
      
      this.form_step_2.patchValue({
        field_who_creat_profile: this.user_basic_info[0]?.ac_for,
        field_name: this.user_basic_info[0]?.u_name,
        field_gender: this.user_basic_info[0]?.gender,
        field_body_type: this.user_basic_info[0]?.body_type,
        field_disability: this.user_basic_info[0]?.disability_flag,
        field_height: this.user_basic_info[0]?.height,
        field_weight: this.user_basic_info[0]?.weight,
        field_mother_tong: this.user_basic_info[0]?.mother_tong_id,
        field_marital_status: this.user_basic_info[0]?.marital_status,
        field_Eating_Habits: this.user_basic_info[0]?.eating_habbits,
        field_Drinking_Habits: this.user_basic_info[0]?.drinking_habbits,
        field_Smoking_Habits: this.user_basic_info[0]?.smoking_habbits        
      })


      this.form_step_3.patchValue({
      field_ur_religion: this.user_basic_info[0]?.religion,
       field_cast: this.user_basic_info[0].caste_id,
      })

      this.form_step_8.patchValue({
        field_About_My_Family: this.user_basic_info[0]?.about_my_family
      })

      this.form_step_9.patchValue({
      //  field_birth_date: this.datePipe.transform(this.user_basic_info[0]?.dob.toString(),'yyyy-MM-dd h:mm:ss'),
      
      // field_birth_date: this.datePipe.transform(this.user_basic_info[0]?.dob.toString(),'dd-MM-yyyy --:--'),

      //  field_birth_date: this.user_basic_info[0]?.dob,
       field_age: this.showAge,
       field_birth_loca: this.birth_loc_name
      })

      this.form_step_10.patchValue({
        field_mobile: this.user_basic_info_New.phone_no.toString(),
        field_email_id: this.user_basic_info_New.email_id,
      })

      })
  }

  get_contact_details(){
    this.service.global_service(0, '/profile/user_contact_details', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.user_basic_info = JSON.parse(responseData)
      this.user_basic_info_New = JSON.parse(responseData)[0];
      // console.log(this.user_basic_info_New );
      
      this.emailFlagContact = JSON.parse(responseData)[0].email_approved_flag
      if(this.emailFlagContact == 'Y'){
        this.verifyBtn=true
      }
      else{
        this.verifyBtn=false

      }

    })
  }

  // get_Single_Photo(){
  //   this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  //     var responseData:any;
  //     responseData = data;
  //     responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  //     this.loded_single_img = JSON.parse(responseData);
  
  
  
  
  //       this.listOfFiles_single.length = 0
  //       for(let dt of this.loded_single_img){
  //         this.listOfFiles_single.push({id:dt.id, filePath: dt.file_path})
  //       }
        
  //     })
      
  // }



 wordCounter_250(event:any){
  if(event == 'hobbies'){

    this.count_hobbies = this.form_step_7.controls.field_Hobbies_Interests.value?.length;
    const inputHobby:any = this.form_step_7.controls.field_Hobbies_Interests.value?.length;
  
    if (inputHobby > 250) {
    this.isButtonDisabled = true;
     }
     else{
     this.isButtonDisabled = false;
    }
  
  }
  if(event == 'fav_music'){

    this.count_music = this.form_step_7.controls.field_Music.value?.length;
    const inputMusic:any = this.form_step_7.controls.field_Music.value?.length;
  
    if (inputMusic > 250) {
    this.isButtonDisabled = true;
     }
     else{
     this.isButtonDisabled = false;
    }
  
  }
  if(event == 'sports_fit'){

    this.count_sports = this.form_step_7.controls.field_Sports.value?.length;
    const inputSports:any = this.form_step_7.controls.field_Sports.value?.length;
  
    if (inputSports > 250) {
    this.isButtonDisabled = true;
     }
     else{
     this.isButtonDisabled = false;
    }
  
  }
  if(event == 'pref_movies'){

    this.count_movies = this.form_step_7.controls.field_Preferred_Movies.value?.length;
    const inputMovie:any = this.form_step_7.controls.field_Preferred_Movies.value?.length;
  
    if (inputMovie > 250) {
    this.isButtonDisabled = true;
     }
     else{
     this.isButtonDisabled = false;
    }
  
  }
  
  
  if(event == 'about_you_text'){
  this.count_AboutYou = this.form_step_1.controls.field_About_us.value?.length;
  const inputString:any =this.form_step_1.controls.field_About_us.value?.length;

  if (inputString > 250) {
  this.isButtonDisabled = true;
   }
   else{
   this.isButtonDisabled = false;
  }
}

if(event == 'about_MyFamily_text'){

  this.count_AboutMyFamily = this.form_step_8.controls.field_About_My_Family.value?.length;
  const inputString2:any = this.form_step_8.controls.field_About_My_Family.value?.length;

  if (inputString2 > 250) {
  this.isButtonDisabled = true;
   }
   else{
   this.isButtonDisabled = false;
  }

}

 }


 stateChange_ByCountry(e:any){
  
  this.service.global_service(0, '/master/states_list', `country_id=${e.value}`).subscribe((data:any) => {
    var responseData_State:any;
    responseData_State = data
    responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
    responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
    this.stateList = responseData_State;

    })

}

cityChange_ByState(e:any){
  
  this.service.global_service(0, '/master/cities_list', `state_id=${e.value}`).subscribe((data:any) => {
    var responseData_State:any;
    responseData_State = data
    responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
    responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
    this.cityList = responseData_State;

    

    })

}

calculateAge() {
  this.age = this.datePipe.transform(this.form_step_9.controls.field_birth_date.value, 'yyyy-MM-dd');
      if(this.age){
        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      }

      if(this.showAge < 18){
        this.isButtonDisabled = true;
      } else {
        this.isButtonDisabled = false;
      }
  
  const birthDate = new Date(this.form_step_9.controls.field_birth_date.value);
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - birthDate.getTime());
  this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
}

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.fruits.push(value);
  }

  // Clear the input value
  // event.chipInput!.clear();

  // this.fruitCtrl.setValue(null);
}
selectedHob(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  // this.fruitInput.nativeElement.value = '';
  // this.fruitCtrl.setValue(null);
}


// remove(fruit: string): void {
//   const index = this.fruits.indexOf(fruit);
//   this.form_step_7.controls.field_Hobbies_Interests.setValue(null)
// debugger
//   if (index >= 0) {
//     this.fruits.splice(index, 1);
//     this.hobId.splice(index, 1);
//     this.form_step_7.controls.field_Hobbies_Interests.setValue(this.hobId);
//   }
//   debugger
// }


}



