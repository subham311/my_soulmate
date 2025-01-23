import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { Router } from '@angular/router';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { user_basic_info } from 'src/app/Model/user_dtls';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';


@Component({
  selector: 'app-partner_preferences',
  templateUrl: './partner_preferences.component.html',
  styleUrls: ['./partner_preferences.component.css']
})
export class Partner_preferencesComponent implements OnInit {

  constructor(private service:DataService, private msgService: MessageService, private sds:SecrectDataService) { }
  user_basic_info:any;
  user_basic_info_New:user_basic_info;
  isShowForm_1 = true;
  store_EditformData_1:any;



  caste_list:any;
  education:any;
  income_list:any;
  occupation_list:any;
  lang_list:any; 
  locationData_dropdown:any;
  state_shorting = new Array();

  frm_Response_common:any;

  localstorageDT:any;

  partners_info:any;

  field_marital_status_OBJ:any;
  field_Religion_OBJ:any;
  ageList: any = []
  ageToList: any = []

  


  form_step_1 = new FormGroup({
    field_frm_age: new FormControl(''),
    field_to_age: new FormControl(''),
    field_mother_tong: new FormControl(''),
    field_ur_religion: new FormControl(''),
    field_marital_status: new FormControl(''),
    field_Country: new FormControl(''),
    field_State: new FormControl(''),
    field_City: new FormControl('')
  });

  countryList = new Array();
  stateList = new Array();
  cityList = new Array();

  public inProgressShort: boolean = true;
  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 


  ngOnInit() {
    this.service.global_service(0, '/master/countries_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
      this.countryList = responseData;
      this.countryList = this.countryList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      })


    this.field_Religion_OBJ = dynamic_data.field_Religion;
    this.field_marital_status_OBJ = dynamic_data.field_marital_status;

    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   ​​​user_name:localStorage.getItem("​​​user_name")
    //  }

     this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      ​​​user_name:this.getLocalSecrectUrl.data.​​​user_name
     }

     for(let i = 18; i < 51; i++){
      this.ageList.push(i)
     }

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
    })

    this.service.global_service(0, '/master/education', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.education = JSON.parse(responseData)
    })

    this.service.global_service(0, '/master/income_list', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.income_list = JSON.parse(responseData)
    })

    this.service.global_service(0, '/master/occupation_list', null).subscribe((data:any) => {
    var responseData:any;
    responseData = data
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.occupation_list = JSON.parse(responseData)
    })

    this.service.global_service(0, '/master/lang_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.lang_list = JSON.parse(responseData)
      })
  
      this.get_Partner_PreferencesDtls()
      this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
        var responseData:any;
        responseData = data;
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        this.user_basic_info = JSON.parse(responseData)
        this.user_basic_info_New = JSON.parse(responseData)[0];
      })
      
      
  }

  public getKeys(obj: any): string[] {
    //return ['kk'];
    return Object.keys(obj);
  }





  toggleDisplayForm(frm_1:any) {
    if(frm_1 == 1){
      this.isShowForm_1 = !this.isShowForm_1;
    } else {
      this.isShowForm_1 = true;
    }

  }

  // clear_saveForm_1(){
  //   this.form_step_1.reset();
  // }


  edit_saveForm_1(){
    this.isShowForm_1 = true;


      this.store_EditformData_1 = {
        user_id: this.localstorageDT.id,
        user: this.localstorageDT.user_name,
        field_frm_age: this.form_step_1.controls.field_frm_age.value,
        field_to_age: this.form_step_1.controls.field_to_age.value,
        field_mother_tong: this.form_step_1.controls.field_mother_tong.value,
        field_ur_religion: this.form_step_1.controls.field_ur_religion.value,
        field_marital_status: this.form_step_1.controls.field_marital_status.value,
  
        field_Country: this.form_step_1.controls.field_Country.value,
        field_State: this.form_step_1.controls.field_State.value,
        field_City: this.form_step_1.controls.field_City.value
      }


    
    
    this.submit_Partner_PreferencesDtls();
    // for(let i = 18; i < 51; i++){
    //   this.ageList.push(i)
    //  }

    

  }


  submit_Partner_PreferencesDtls(){
    
    this.frm_Response_common = '';
    this.service.global_service(1, '/partner/update_partner', {data: btoa(JSON.stringify(this.store_EditformData_1))}).subscribe(data=>{
      this.frm_Response_common = data;
      if(this.frm_Response_common.suc > 0){
        

        this.get_Partner_PreferencesDtls();

        this.msgService.successMsg('SS')
      }else{
        this.msgService.errorMsg('ES')
      }
  
      });
  }

  get_Partner_PreferencesDtls(){
    this.inProgressShort = true; 
    this.service.global_service(0, '/partner/partner_pref', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false;
      this.partners_info = JSON.parse(responseData);
      this.inProgressShort = false; 

      if(this.partners_info[0]?.age_frm > 0){
        this.generateAgeToList(this.partners_info[0]?.age_frm)
      }
      if(this.partners_info.length > 0){
        
        

        this.form_step_1.patchValue({
          field_frm_age: this.partners_info[0]?.age_frm ?? '',
          field_to_age: this.partners_info[0]?.age_to ?? '',
          field_marital_status: this.partners_info[0]?.marital_status ?? '',
          field_mother_tong: this.partners_info[0]?.mother_tounge_id.toString() ?? '',
          field_ur_religion: this.partners_info[0]?.religion ?? '',
          field_State: this.partners_info[0]?.field_State ?? '',
          field_City: this.partners_info[0]?.field_City ?? ''
        })
      }

      })
  }

  generateAgeToList(e:any){
    this.ageToList.length = 0;
    for(let i = parseInt(e)+1; i < 61; i++){
      this.ageToList.push(i)
     }
     
  }




  stateChange_ByCountry(e:any){
    
    this.service.global_service(0, '/master/states_list', `country_id=${e.value}`).subscribe((data:any) => {
      var responseData_State:any;
      responseData_State = data
      responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
      responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
      this.stateList = responseData_State;
      this.stateList = this.stateList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
      
  
      })
  
  }
  
  cityChange_ByState(e:any){
    
    this.service.global_service(0, '/master/cities_list', `state_id=${e.value}`).subscribe((data:any) => {
      var responseData_State:any;
      responseData_State = data
      responseData_State = responseData_State.suc > 0 ? atob(responseData_State.msg) : false
      responseData_State = responseData_State ? JSON.parse(responseData_State) : 'Error occures in API'
      this.cityList = responseData_State;
      this.cityList = this.cityList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  
      
  
      })
  
  }



}
