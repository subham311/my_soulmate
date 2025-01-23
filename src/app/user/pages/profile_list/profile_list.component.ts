import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { environment } from 'src/environments/environment';

import { user_basic_info, partOwnLoca_ProfileMatch, partnerBasicInfo_ProfileMatch } from 'src/app/Model/user_dtls';
import { Subscription, pluck } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';



@Component({
  selector: 'app-profile_list',
  templateUrl: './profile_list.component.html',
  styleUrls: ['./profile_list.component.css']
})
export class Profile_listComponent implements OnInit {
   
  cancelPending:Subscription;


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    nav: true,
    navText: ['<img src="assets/images/aro_left_pro.png" alt=""/>', '<img src="assets/images/aro_right_pro.png" alt=""/>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      650: {
        items: 2
      },
      940: {
        items: 1
      }
    },
    
  }


/**
 * Suman Mitra 
 */
    
  __page_count:number = 5;
  __total_pertner:number = 0;
  __bkp_arr_pertner:any = [];
  /*
  *  END
  */

  

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
  field_Religion_OBJ:any;
  field_Employed_in_OBJ:any; 
  field_field_Sports_OBJ:any;
  field_Preferred_Movies_OBJ:any;
  field_Spoken_Languages_OBJ:any;
  field_Music_OBJ:any;
  field_Hobbies_Interests_OBJ:any;
  field_country_OBJ:any;

  

  partnerList = new Array();
  localstorageDT:any;
  imageBaseUrl:any;
  searchData:any;
  searchFilterDataObj:any;
  lang_list:any;
  memberShipStatus:any;
  min = 0;
  max = 6;
  // partnerLocation: partOwnLoca_ProfileMatch;
  // partnerBasicInfo_ProfileMatch:partnerBasicInfo_ProfileMatch;

  ownProfileMatchDt1:any;
  ownProfileMatchDt2:any;
  profileMatchPercenCount:number =0;
  profileMatchPercenCount2:number =0;

  searchDataSend:any;
  searchRequestData:any;

  public inProgress: boolean = false;

  public inProgressShort: boolean = true;
  public inProgressShortPopup: boolean = true;
  public onLoadPageSlice;

  notDataFound: boolean = true;

  minListShowData_withoutLog = 9;


eachPageSize = 12;
// totalData = 16;

elementory_Marks:any;
numerology_Marks:any;
OstoKut_Marks:any;
MongalDosha_Marks:any;

sendMsgData:any;
sendMsgResponseData:any;

loded_single_img:any;
listOfFiles_single: any[] = [];

loded_single_img_login_user:any;
listOfFiles_single_login_user: any[] = [];
profile_UserId:any;
wonId:any;



partners_Details:any;
age:any;
partnersRasi_get:any;
showAge:any;

// singlePartnDetailsPop:any;
singlePartnDetailsPop_newAray:any;
partner_match_list:any;
profileMarks:any;

accTypeAftPay:any;
buttonColor: string = '#B2BEB5';


  constructor(private service:DataService, private router:Router, private route: ActivatedRoute, private msgService: MessageService, private datePipe: DatePipe, private sds:SecrectDataService, private location: Location
    ) { }

  ischecked_desclaimer:any;
  sendMsgForm = new FormGroup({
    conformTerms: new FormControl('',[Validators.required]),
  });

  getLocalSecrectUrl= this.sds.getLocalSecrectData();



  ngOnInit() {

    

    // const data = this.getLocalSecrectUrl;
    

    this.accTypeAftPay = this.getLocalSecrectUrl.data.pay_name;

    var string1 = 'Stack Exchange premium';
    var words = string1.split(' ');

    var test = words[words.length-1].substr(0, 1);

    this.field_height_OBJ = dynamic_data.field_height;

  this.ac_for_OBJ = dynamic_data.ac_for;
  
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
  this.field_field_Sports_OBJ = dynamic_data.field_Music;
  
  this.field_Preferred_Movies_OBJ = dynamic_data.field_Preferred_Movies;
  
  this.field_Spoken_Languages_OBJ = dynamic_data.field_Spoken_Languages;

  
  
  // this.memberShipStatus = {
  // payStatus:localStorage.getItem("plan_id"),
  // pay_name:localStorage.getItem("pay_name")
  // }

 this.memberShipStatus = {
  payStatus:this.getLocalSecrectUrl.data.plan_id,
  pay_name: this.getLocalSecrectUrl.data.pay_name
  }
  // console.log(this.memberShipStatus);
  // this.localstorageDT = {
  // id:localStorage.getItem("id"),
  // ​​​user_name:localStorage.getItem("​​​user_name")
  // }

  this.localstorageDT = {
    id:this.getLocalSecrectUrl.data.id,
    ​​​user_name:this.getLocalSecrectUrl.data.​user_name
    }

  this.service.global_service(0, '/master/lang_list', null).subscribe((data:any) => {
  var responseData:any;
  responseData = data
  responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  this.lang_list = JSON.parse(responseData)
  })

  this.imageBaseUrl = environment.api_url + '/uploads/';

  
  // this.memberShipStatus = {
  // payStatus:localStorage.getItem("plan_id"),
  // pay_name:localStorage.getItem("pay_name")
  // }

  this.memberShipStatus = {
  payStatus:this.getLocalSecrectUrl.data.plan_id,
  pay_name:this.getLocalSecrectUrl.data.pay_name
  }


  this.get_PartnerList();
  this.get_ownProfileMatchDt1();
  this.get_ownProfileMatchDt2();
  // this.get_Family_DetailsDtls();
    
  }

  goBack(): void {
    this.location.back();
  }
  

  // get_Single_Photo__Astro(){

  //   this.profile_UserId = this.route.snapshot.paramMap.get('id');
    
    
  //   // this.service.global_service(0, '/profile/profile_pic', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
  //   this.service.global_service(0, '/profile/profile_pic', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
  //     var responseDataSingle:any;
  //     responseDataSingle = data;
      
      
  //     responseDataSingle = responseDataSingle.suc > 0 ? atob(responseDataSingle.msg) : false;
  //     this.loded_single_img = JSON.parse(responseDataSingle);

  
  
  
  
  //       this.listOfFiles_single.length = 0
  //       for(let dt of this.loded_single_img){
  //         // this.listOfFiles_single.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
  //         this.listOfFiles_single.push({id:dt.id, filePath: dt.file_path})
          
  //       }

        
  //     })
      
  // }




  get_ownProfileMatchDt1(){
    this.service.global_service(0, '/profile/user_groom_loc', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.ownProfileMatchDt1 = JSON.parse(responseData)[0]
      // console.log(this.ownProfileMatchDt1,'loc');
      
      })
  }

  get_ownProfileMatchDt2(){
    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.ownProfileMatchDt2 = JSON.parse(responseData)[0]
      
      
      })
  }




    get_PartnerList(){
    this.service.global_service(0, '/partner/partner_match', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
    var responseData = data;

    

    if(responseData.suc > 0){

    this.partnerList = data.msg;

    // console.log(this.partnerList, 'partnerList');
    



    for(let i=0; i<this.partnerList.length; i++) {
      if(this.memberShipStatus.payStatus > 0){
        this.partnerList[i]['freetoSee'] = 1;
      }else{
        this.partnerList[i]['freetoSee'] = 0;

        // 1st 5 Free User can see partners details -- Start URoy--
        // if(i > 4){
        //   this.partnerList[i]['freetoSee'] = 0;
        // }else{
        //   this.partnerList[i]['freetoSee'] = 1;
        // }
        // 1st 5 Free User can see partners details -- End URoy--

      }
      
      // this.partnerList[1]['freetoSee'] = 1;
    }

  //  this.singlePartnDetailsPop_newAray.partner['basic_marks'] = incrementItem;



    // this.pageSlice = this.partnerList.slice(0, 12);

    // this.pageSlice.sort((a, b) => b.astro_match_marks - a.astro_match_marks);

    this.partnerList.sort((a, b) => b.astro_match_marks - a.astro_match_marks);
    this.onLoadPageSlice = this.partnerList.slice(0, 12);



    // this.elementory_Marks = 20;
    // this.numerology_Marks = 30;
    // this.OstoKut_Marks = 10;
    // this.MongalDosha_Marks = 20;

    for(let i=0; i<this.partnerList.length; i++) this.partnerList[i]['blurr_content'] = i;

    this.generate_fn(this.onLoadPageSlice);
    this.inProgressShort = false; 

    }else{

    this.msgService.errorMsg('ES');

    }



    })
    }

    onPageChange(event){
      
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.partnerList.length){
    endIndex = this.partnerList.length;
    }
    this.onLoadPageSlice = this.partnerList.slice(startIndex, endIndex);
    // this.pageSlice.sort((a, b) => b.astro_match_marks - a.astro_match_marks);
      
      
    }

    shortingFn(event){
      
      // this.partnerList = [...this.partnerList,...data.sort((a, b) => b.astro_match_marks - a.astro_match_marks)]
      if(event.value == 'a_high_low'){
        // this.onLoadPageSlice.sort((a, b) => b.astro_match_marks - a.astro_match_marks);
        
        this.partnerList.sort((a, b) => b.astro_match_marks - a.astro_match_marks);
        this.onLoadPageSlice = this.partnerList.slice(0, 12);
        

      }

      if(event.value == 'a_low_high'){
        // this.onLoadPageSlice.sort((a, b) => a.astro_match_marks - b.astro_match_marks);

        this.partnerList.sort((a, b) => a.astro_match_marks - b.astro_match_marks);
        this.onLoadPageSlice = this.partnerList.slice(0, 12);

      }

      if(event.value == 'pro_high_low'){
        
        // this.onLoadPageSlice.sort((a, b) => b.basic_marks - a.basic_marks);

        this.partnerList.sort((a, b) => b.basic_marks - a.basic_marks);
        this.onLoadPageSlice = this.partnerList.slice(0, 12);
      }

      if(event.value == 'pro_low_high'){
        // this.onLoadPageSlice.sort((a, b) => a.basic_marks - b.basic_marks);

        this.partnerList.sort((a, b) => a.basic_marks - b.basic_marks);
        this.onLoadPageSlice = this.partnerList.slice(0, 12);
      }

      if(event.value == 'ASC'){
        // alert('')
        // this.onLoadPageSlice = this.onLoadPageSlice.sort((a, b)=> a.basic_information.value[0].u_name.toLowerCase().localeCompare(b.basic_information.value[0].u_name.toLowerCase()))
      
        this.partnerList = this.partnerList.sort((a, b)=> a.basic_information.value[0].u_name.toLowerCase().localeCompare(b.basic_information.value[0].u_name.toLowerCase()))
        this.onLoadPageSlice = this.partnerList.slice(0, 12);
      }

      if(event.value == 'DESC'){
        // this.onLoadPageSlice = this.onLoadPageSlice.sort((a, b)=> b.basic_information.value[0].u_name.toLowerCase().localeCompare(a.basic_information.value[0].u_name.toLowerCase()))
        
        this.partnerList = this.partnerList.sort((a, b)=> b.basic_information.value[0].u_name.toLowerCase().localeCompare(a.basic_information.value[0].u_name.toLowerCase()))
        this.onLoadPageSlice = this.partnerList.slice(0, 12);
      }


      
    }




    // scrollEnd = (ev) =>{
      
    //   if(ev){
    //     if(this.cancelPending.closed){
    //       this.min = this.min > 0 ? this.min + 2 : this.max;
    //       this.max = 2;
    //       // this.max = this.max + 2;
    //     this.get_PartnerList(this.min,this.max);
    //     }
  
    //   }

      
    // }

  generate_fn(partnerList:any){
  // generate_fn(){
  this.service.searchPartner.subscribe((res)=>{
  this.searchData = res;

  
  if(this.searchData){

    this.searchFilterDataObj = {
      sear_frm_age: this.searchData.sear_frm_age,
      sear_to_age: this.searchData.sear_to_age,
      sear_religion: this.searchData.sear_religion,
      sear_mari_stat: this.searchData.sear_mari_stat,
      sear_moth_ton: this.searchData.sear_moth_ton,
      sear_state: this.searchData.sear_state,
      sear_city: this.searchData.sear_city,
      sear_Country: this.searchData.sear_Country
      }


    this.onLoadPageSlice =  partnerList.filter((dt:any, i:any) => {



      const searConvertAge = new Date(dt.basic_information.value[0].dob);
      const searTimeDiff = Math.abs(Date.now() - searConvertAge.getTime());
      var search_Age = Math.floor((searTimeDiff / (1000 * 3600 * 24))/365.25);
    
      
    
      // if(search_Age >= this.searchFilterDataObj.sear_frm_age  && search_Age <= this.searchFilterDataObj.sear_to_age || dt.basic_information.value[0]?.religion == this.searchFilterDataObj.sear_religion || dt.basic_information.value[0]?.marital_status == this.searchFilterDataObj.sear_mari_stat || dt.basic_information.value[0]?.mother_tong == this.searchFilterDataObj.sear_moth_ton || dt.groom_location.value[0]?.state ==  this.searchFilterDataObj.sear_state || dt.groom_location.value[0]?.city == this.searchFilterDataObj.sear_city){
        if(search_Age >= this.searchFilterDataObj.sear_frm_age  && search_Age <= this.searchFilterDataObj.sear_to_age){  
      // this.msgService.successMsg('SS');
        this.notDataFound = true;
        return dt;
        } 
        // else {

        //   this.notDataFound = false;
        // }
    
      });

      
    



  }
  });

  

  }

  nameShort(event:any){
    if(event.length > 0){
      var wordsSplit = event.trim().split(" ");
      var shortFirstWord = wordsSplit[0];
      var shortLastWord = wordsSplit[wordsSplit.length-1][0];
  
      var fullName = shortFirstWord + ' ' +shortLastWord +'...'
      return fullName;
    }else{
      return '';
    }
  }


  ageCalculat(date:any){
    var showAge = 0;
      if(date){
        const convertAge = new Date(date);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      }
      return showAge;
  }


  memberCheckFn(pay_flag:any){

    this.router.navigate(['/user/portfolio_view', btoa(pay_flag)]);

    // if(this.memberShipStatus.payStatus == 'Y'){
    //   this.router.navigate(['/portfolio_view', pay_flag]);
    // }
 
    // if(this.memberShipStatus.payStatus == 'N'){
    //   this.router.navigate(['/paymentGetway']);
    // }
  }




//   confirm_To_sendMSG(event:any){
    
//     if(event.checked){
//       this.ischecked_desclaimer = false
//     } else{
//     this.ischecked_desclaimer = true
//   }

// }

//   sendMsg(Id, profile_Id, name, from_email, to_email ){
//     this.sendMsgData = '';

//     this.sendMsgData = {
//       id: Id,
//       profile_id: profile_Id,
//       user_name: name,
//       frm_email: from_email,
//       to_email: to_email
//     }

//   }

//   sendMsgConfirm(){
//     this.service.global_service(1, '/profile/search_email', {data: btoa(JSON.stringify(this.sendMsgData))}).subscribe(data=>{
//       this.sendMsgResponseData = data;
  
//       if(this.sendMsgResponseData.suc > 0){
        
//         this.msgService.successMsg('SS')
//       }else{
//         this.msgService.errorMsg('ES')
//       }

//       });
//   }


showAstroPopup(partnerId, user_Id){

  // this.profile_UserId = this.route.snapshot.paramMap.get('id');
  this.profile_UserId = partnerId;
  this.wonId = user_Id;


    
    
  // this.service.global_service(0, '/profile/profile_pic', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
  this.service.global_service(0, '/profile/profile_pic', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
    var responseDataSingle:any;
    responseDataSingle = data;
    
    
    responseDataSingle = responseDataSingle.suc > 0 ? atob(responseDataSingle.msg) : false;
    this.loded_single_img = JSON.parse(responseDataSingle);





      this.listOfFiles_single.length = 0
      for(let dt of this.loded_single_img){
        // this.listOfFiles_single.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
        this.listOfFiles_single.push({id:dt.id, filePath: dt.file_path})
        
      }

      
    })

  this.service.global_service(0, '/profile/profile_pic', `user_id=${this.wonId}`).subscribe((data:any) => {
    var responseDataSingle:any;
    responseDataSingle = data;
    
    responseDataSingle = responseDataSingle.suc > 0 ? atob(responseDataSingle.msg) : false;
    this.loded_single_img_login_user = JSON.parse(responseDataSingle);

      this.listOfFiles_single_login_user.length = 0
      for(let dt of this.loded_single_img_login_user){
        // this.listOfFiles_single_login_user.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
        this.listOfFiles_single_login_user.push({id:dt.id, filePath: dt.file_path})
      }

      
    })

    // this.get_Partners_Family_DetailsDtls();
    // this.partners_Rashi_details_Get();
    this.get_Partners_Family_DetailsDtls();
    

}

profilePercentageCal(){
	
	let incrementItem = 0;
	let increMentVal = (100/16);
	
	var addPercentage = 6.25;
  
	var partnerAge;
	if(this.singlePartnDetailsPop_newAray.partner.basic_information.value[0]?.dob){
	const convertAge = new Date(this.singlePartnDetailsPop_newAray.partner.basic_information.value[0]?.dob);
	const timeDiff = Math.abs(Date.now() - convertAge.getTime());
	partnerAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
	}
  
	var ownAge;
	if(this.ownProfileMatchDt2.dob){
	const convertAge = new Date(this.ownProfileMatchDt2.dob);
	const timeDiff = Math.abs(Date.now() - convertAge.getTime());
	ownAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
	}
  
  if(this.ownProfileMatchDt2.gender == "M"){
	if(ownAge > partnerAge && (ownAge-8) < partnerAge){
	  incrementItem = incrementItem + increMentVal;
	  
	}
  } 
  
  
  if(this.ownProfileMatchDt2.gender == "F"){
	if(ownAge < partnerAge && (ownAge+8) > partnerAge){
	  incrementItem = incrementItem + increMentVal;
	}
  } 

  
  if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.marital_status == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].marital_status){
    incrementItem = incrementItem + increMentVal;
    }
    
    // will be work Height
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.height == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].height){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.family_status == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].family_status){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.family_values == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].family_values){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.family_type == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].family_type){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.disability_flag == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].disability_flag){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.drinking_habbits == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].drinking_habbits){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.eating_habbits == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].eating_habbits){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.smoking_habbits == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].smoking_habbits){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.mother_tong == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].mother_tong){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.religion == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].religion){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt2.state_name == this.singlePartnDetailsPop_newAray.partner.basic_information.value[0].state_name){
    incrementItem = incrementItem + increMentVal;
    }
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt1.emp_type == this.singlePartnDetailsPop_newAray.partner.groom_location.value[0].emp_type){
    incrementItem = incrementItem + increMentVal;
    }
    
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt1.education_name == this.singlePartnDetailsPop_newAray.partner.groom_location.value[0].education_name){
    incrementItem = incrementItem + increMentVal;
    }
    
    if(this.singlePartnDetailsPop_newAray.partner.groom_location.value.length > 0 && this.ownProfileMatchDt1.occu_name == this.singlePartnDetailsPop_newAray.partner.groom_location.value[0].occu_name){
    incrementItem = incrementItem + increMentVal;
    }
    
    this.singlePartnDetailsPop_newAray.partner['basic_marks'] = incrementItem;
    
    
    
    
    // i = i + iValue;
    // partnerList['blurr_content'] = i + iValue;
    
    
    
    // return Math.round(incrementItem);
    this.profileMarks = Math.round(incrementItem)
  
  
}

get_Partners_Family_DetailsDtls(){
  this.inProgressShortPopup = true; 

  this.service.global_service(0, '/partner/partner_match_marks', `own_id=${this.wonId}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
    this.partner_match_list = data;

    
    

    if(this.partner_match_list.suc > 0){



    this.singlePartnDetailsPop_newAray = this.partner_match_list;

    this.inProgressShortPopup = false; 

    this.profilePercentageCal();

    } else {
      this.msgService.errorMsg('ES');
      this.inProgressShortPopup = true; 
    }
    

    })


  

}

// get_Partners_Family_DetailsDtls(){
    
//   this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
//     var responseData:any;
//     responseData = data;
//     responseData = responseData.suc > 0 ? atob(responseData.msg) : false
//     this.partners_Details = JSON.parse(responseData)[0];

    



//     this.age = this.datePipe.transform(this.partners_Details?.dob, 'yyyy-MM-dd');
//     if(this.age){

//       const convertAge = new Date(this.age);
//       const timeDiff = Math.abs(Date.now() - convertAge.getTime());
//       this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

//     }
    

//     })
// }

// partners_Rashi_details_Get(){
    
    
//   this.service.global_service(0, '/partner/partner_match_marks', `own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
//     // ?own_id=&partner_id=
//     // var responseDataSingle:any;
//     this.partnersRasi_get = data;

    
    
//     // responseDataSingle = responseDataSingle.suc > 0 ? atob(responseDataSingle.msg) : false;
//     // this.partnersRasi_get = JSON.parse(responseDataSingle);


     
      
//     })
    
// }
// enableButton() {
//   debugger
//   if(this.memberShipStatus.payStatus)
//   {
//   this.buttonColor = 'red';
//   // console.log(this.memberShipStatus);
//   }
//   else{
//     alert("Upgrade Now")
//   }
  
  
// }


}
