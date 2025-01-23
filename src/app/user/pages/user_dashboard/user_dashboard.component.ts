import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { user_basic_info, user_groom_loc, partner_pref } from 'src/app/Model/user_dtls';
import DiscoverMatches from '../../../../assets/JSON/discover_matches.json';
import { pluck } from 'rxjs';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
export interface IDiscoveMatches{
  "id":number,
  "match_by":string,
  "img":string,
  "url":string,
  "flag":string,
  "matches":number,
  "is_loader":boolean
}
import { Location } from '@angular/common';

@Component({
  selector: 'app-user_dashboard',
  templateUrl: './user_dashboard.component.html',
  styleUrls: ['./user_dashboard.component.css']
})
export class User_dashboardComponent implements OnInit {
  kyc_verification:boolean=false;
  userData_1:user_basic_info;

  discover_matches:IDiscoveMatches[] =DiscoverMatches;

  localstorageDT:any;
  user_basic_info:any;
  user_basic_info_New:user_basic_info;
  rashiData:any;
  userBirthLocation:any;
  age:any;
  showAge:any;
  partnerAge:any;
  partnerList:any;
  partnerList_New:any;

  ageCouter:any;

  min:number = 0
  max:number = 6

  // d:any;
  // calculateAge:any;

  // age_frm: 18 this.partners_info[0].age_frm /// dt.basic_information.value[0].dob
// ​age_to: 35  this.partners_info[0].​age_to ///  dt.basic_information.value[0].dob
// ​location_id: 7
// ​location_name: "Kolkata" this.partners_info[0].​location_name ///  dt.groom_location.value[0].city
// ​marital_status: "N" this.partners_info[0].​marital_status ///  dt.basic_information.value[0].marital_status
// ​mother_tounge: "Bengali"  this.partners_info[0].​mother_tounge ///  dt.basic_information.value[0].mother_tong
// ​religion: "Hindu"  this.partners_info[0].​religion ///  dt.basic_information.value[0].religion

ageWiseCounter :any;
locationWiseCounter = 0;
maritalWiseCounter = 0;
mother_toungeWiseCounter = 0;
religionWiseCounter = 0;

field_height_OBJ:any;
partners_info:partner_pref;

memberShipStatus:any;

imageBaseUrl:any;
accTypeAftPay:any;
// loded_single_img:any;
// listOfFiles_single: any[] = [];

  // ascendantHouse:any;
  // marsPositionFrmAsendent:any;
  // marsPositionFrmMoon:any;

  // ascendantNewArrIndex:any;
  // moonNewArrIndex:any;

  planelPosition:any = [
    [],[],[],[],[],[],[],[],[],[],[],[]
  ]

  // allDosa:any = { 
  //   mongolDasa: {asce: "",
  //                moon: ""},
  //   maxPlanet: { slab_a: "",
  //               slab_e: "",
  //               slab_f: "",
  //               slab_w: ""}
  //   }

  popupDisplay:any;
  profileVerification:any
  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  constructor(private service:DataService, private router:Router, private msgService: MessageService, private datePipe: DatePipe, private sds:SecrectDataService, private location: Location) { }

  

  ngOnInit() {
    this.accTypeAftPay = this.getLocalSecrectUrl.data.pay_name;
  // this.profileVerification = {
  // profile_flag:localStorage.getItem("​​​profile_flag")
  // }

  this.profileVerification = {
  profile_flag:this.getLocalSecrectUrl.data.profile_flag
  }

  this.field_height_OBJ = dynamic_data.field_height;

  // this.memberShipStatus = {
  // payStatus:localStorage.getItem("plan_id"),
  // pay_name:localStorage.getItem("pay_name")
  // }

  this.memberShipStatus = {
    payStatus:this.getLocalSecrectUrl.data.plan_id,
    pay_name:this.getLocalSecrectUrl.data.pay_name
    }

  // this.localstorageDT = {
  //   id:localStorage.getItem("id"),
  //   user_name:localStorage.getItem("​​​user_name")
  //  }

  this.localstorageDT = {
    id:this.getLocalSecrectUrl.data.id,
    user_name:this.getLocalSecrectUrl.data.​​​user_name
   }

   this.imageBaseUrl = environment.api_url + '/uploads/';

  
  // setTimeout(()=>{
  //   this.showPopup();
  // }, 5000)
  
  this.get_rashiDataDtls();
  this.get_Family_DetailsDtls();
  this.get_PartnerList();
  

  }

  goBack(): void {
    this.location.back();
  }

  // showPopup(){
  //   this.popupDisplay = document.getElementById('exampleModalNotice');
  //   this.popupDisplay.classList.add('show');
  //   this.popupDisplay.classList.add('show_custom');
  // }


  removePopup(){
    this.popupDisplay = document.getElementById('exampleModalNotice');
    this.popupDisplay.classList.remove('show');
    this.popupDisplay.classList.remove('show_custom');
  }


  public getKeys(obj: any): string[] {
    return Object.keys(obj);
  }


  get_rashiDataDtls(){
    this.service.global_service(0, '/planet_position', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      // responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      // this.rashiData = JSON.parse(responseData)
      this.rashiData = responseData.msg
      this.userBirthLocation = responseData;


      this.planelPosition[0]=this.rashiData.filter((e:any)=>e.position==1);
      this.planelPosition[1]=this.rashiData.filter((e:any)=>e.position==2);
      this.planelPosition[2]=this.rashiData.filter((e:any)=>e.position==3);
      this.planelPosition[3]=this.rashiData.filter((e:any)=>e.position==4);
      this.planelPosition[4]=this.rashiData.filter((e:any)=>e.position==5);
      this.planelPosition[5]=this.rashiData.filter((e:any)=>e.position==6);
      this.planelPosition[6]=this.rashiData.filter((e:any)=>e.position==7);
      this.planelPosition[7]=this.rashiData.filter((e:any)=>e.position==8);
      this.planelPosition[8]=this.rashiData.filter((e:any)=>e.position==9);
      this.planelPosition[9]=this.rashiData.filter((e:any)=>e.position==10);
      this.planelPosition[10]=this.rashiData.filter((e:any)=>e.position==11);
      this.planelPosition[11]=this.rashiData.filter((e:any)=>e.position==12);
      
      })
  
  }

  get_Partner_PreferencesDtls(partnerListPara:any){
    this.service.global_service(0, '/partner/partner_pref', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.partners_info = JSON.parse(responseData)



// Infuture will be use this code Start_______________________ 

// age_frm: 18 this.partners_info[0].age_frm /// dt.basic_information.value[0].dob
// ​age_to: 35  this.partners_info[0].​age_to ///  dt.basic_information.value[0].dob
// ​location_id: 7
// ​location_name: "Kolkata" this.partners_info[0].​location_name ///  dt.groom_location.value[0].city
// ​marital_status: "N" this.partners_info[0].​marital_status ///  dt.basic_information.value[0].marital_status
// ​mother_tounge: "Bengali"  this.partners_info[0].​mother_tounge ///  dt.basic_information.value[0].mother_tong
// ​religion: "Hindu"  this.partners_info[0].​religion ///  dt.basic_information.value[0].religion

// ageWiseCounter:any;
// locationWiseCounter:any;
// maritalWiseCounter:any;
// mother_toungeWiseCounter:any;
// religionWiseCounter:any;


       
// partnerListPara.filter((new_dt:any, i:any) => {
// var ageCount = 1;

// if(new_dt.basic_information.value[0].dob){
// const convertAge = new Date(new_dt.basic_information.value[0].dob);
// const timeDiff = Math.abs(Date.now() - convertAge.getTime());
// this.ageCouter = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
// }
// if( this.ageCouter >= this.partners_info[0].age_frm  &&  this.ageCouter <= this.partners_info[0].age_to){
// this.ageWiseCounter = ageCount + i;
// sessionStorage.setItem('age_Match', this.ageWiseCounter.toString());
// }

// });


// var partnerList_New = partnerListPara.filter((new_dt:any, i:any) => {
// var locationCount = 1;

// if(this.partners_info[0].location_name == new_dt.groom_location.value[0].city){
// this.locationWiseCounter = locationCount + i;
// sessionStorage.setItem('city_Match', this.locationWiseCounter.toString());
// }

// });
// Infuture will be use this code End____________________________ 

      

      })
  }

  get_Family_DetailsDtls(){
    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.user_basic_info = JSON.parse(responseData);
      this.user_basic_info_New = JSON.parse(responseData)[0];

      if(this.user_basic_info_New.kyc_flag == 'Y'){
        this.kyc_verification=true
      }
      else{
      this.kyc_verification=false
      }
      })

  }
  
  // get_PartnerList(){
  //   this.service.global_service(0, '/partner/partner_match', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  //     var responseData:any;
  //     this.partnerList = data.msg;
  //     this.get_Partner_PreferencesDtls(this.partnerList);
  //     }) 
  // }
  
  get_PartnerList(){
    this.service.global_service(0, '/partner/partner_match', `user_id=${this.localstorageDT.id}&min=${this.min}&max=${this.max}`)
    .pipe(pluck('msg'))
    .subscribe((data:any) => {
      this.partnerList = data;
      this.partnerList = this.partnerList.length > 0 ? this.partnerList.sort((a,b) => (a.astro_match_marks > b.astro_match_marks) ? -1 : ((a.astro_match_marks < b.astro_match_marks) ? 1 : 0)) : [];
      // this.partnerList = [...this.partnerList,...data.sort((a, b) => b.astro_match_marks - a.astro_match_marks)];
      /***** SUMAN MITRA WORKED ON THAT */
      // this.discover_matches = this.discover_matches.filter((item:IDiscoveMatches,index:number) =>{
      //      switch(item.flag){
      //       case 'M':
      //       item.matches = this.partnerList.filter((item) =>item.basic_information.value[0].mother_tong_id == this.user_basic_info_New?.mother_tong_id).length;
      //       break;
      //       case 'C':  item.matches = this.partnerList.filter((item) =>item.basic_information.value[0].city_id == this.user_basic_info_New?.city_id).length;break;
      //       case 'R':  item.matches = this.partnerList.filter((item) =>item.basic_information.value[0].religion == this.user_basic_info_New?.religion).length;break;
      //      }
      //      item.is_loader = false;
      //      return true;
      // })
      /** END */
      this.get_Partner_PreferencesDtls(this.partnerList);
      })
  }



  ageCalculat(date:any){
    var showAge;
      if(date){
        const convertAge = new Date(date);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      }
      return showAge;
  }

  dashBoardSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  memberCheckFn(pay_flag:any){

    if(this.memberShipStatus.payStatus == 'Y'){
      this.router.navigate(['/user/portfolio_view', pay_flag]);
    }

    if(this.memberShipStatus.payStatus == 'N'){
      this.router.navigate(['/user/paymentGetway']);
    }
    
  }


  // get_Single_Photo(){
  //   this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  //     var responseData:any;
  //     responseData = data;
  //     responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  //     this.loded_single_img = JSON.parse(responseData);
  
  
  
  
  //       this.listOfFiles_single.length = 0
  //       for(let dt of this.loded_single_img){
  //         this.listOfFiles_single.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
  //       }
        
  //     })
      
  // }
  nameShort(event:any){
    var wordsSplit = event.trim().split(" ");
    var shortFirstWord = wordsSplit[0];
    var shortLastWord = wordsSplit[wordsSplit.length-1][0];

    var fullName = shortFirstWord + ' ' +shortLastWord +'...'
    return fullName;
  }

}
