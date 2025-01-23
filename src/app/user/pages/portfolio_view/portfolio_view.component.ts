import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
// import { Lightbox } from 'ngx-lightbox';
import { user_basic_info, user_groom_loc } from 'src/app/Model/user_dtls';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-portfolio_view',
  templateUrl: './portfolio_view.component.html',
  styleUrls: ['./portfolio_view.component.css']
})
export class Portfolio_viewComponent implements OnInit {
    currentItem = 'Television';
 

    flag: any = false

  constructor(private service:DataService, private router:Router, private route: ActivatedRoute, private msgService: MessageService, private datePipe: DatePipe, private sds:SecrectDataService, private location: Location) { }

  age:any;
  showAge:any;

  // user_profile:any;
  user_basic_info:any;
  user_basic_info_New:user_basic_info;
  user_about:any;
  groomLoc_ProfInfo:user_groom_loc;
  user_hobbi:any;


  ac_for_OBJ:any;
  field_Religion_OBJ:any;
  field_weight_OBJ:any;
  field_body_type_OBJ:any;
  field_marital_status_OBJ:any;
  field_country_OBJ:any;
  field_height_OBJ:any;
  field_disability_OBJ:any;
  field_Eating_Habits_OBJ:any;
  field_Drinking_Habits_OBJ:any;
  field_Smoking_Habits_OBJ:any;
  field_Employed_in_OBJ:any;
  field_Father_Occupation_OBJ:any;
  field_Mother_Occupation_OBJ:any;
  field_family_value_OBJ:any;
  field_family_type_OBJ:any;
  field_family_status_OBJ:any;
  field_No_Brother_OBJ:any;
  field_No_Sister_OBJ:any;
  field_Family_Location_OBJ:any;
  field_Hobbies_Interests_OBJ:any;
  field_Music_OBJ:any;
  field_field_Sports_OBJ:any;
  field_Preferred_Movies_OBJ:any;
  field_Spoken_Languages_OBJ:any;
  
  localstorageDT:any;
  newHobbiData:any;

  partners_info:any;
  profile_UserId:any;

  galleryPhoto:any;

  imageBaseUrl:any;
  loded_single_img:any;
  listOfFiles_single: any[] = [];

  loded_single_img_login_user:any;
  listOfFiles_single_login_user: any[] = [];

  userData_1_LoginUser:any;

  partnersRasi_get:any;

  profileVerification:any


  profile_UserIdGet = atob(this.route.snapshot.paramMap.get('id'));
  
  
  orderIdAray = this.profile_UserIdGet.split("&");
  
  profile_UserId_new = this.orderIdAray[0];
  canViewProf = this.orderIdAray[1];

  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 
  

  isVisible:boolean = this.profile_UserId_new == this.getLocalSecrectUrl.data.id;

 

  memberShipStatus:any;
  public inProgressShortPopup: boolean = true;

  partner_match_Marks:any;
  profileMarks:any;
  singlePartnDetailsPop_newAray:any;
  ownProfileMatchDt1:any;
  ownProfileMatchDt2:any;
  profile_flag:any;

  verifyDivPause = true;
  accTypeAftPay:any;
  buttonColor: '#B2BEB5' | 'red' = '#B2BEB5';
  isbtnclicked = false
  buttonText = 'Click the button';
  get_fav_list:any
  updateList:any
  res_updateList:any
  updradebtn= false
  

  ngOnInit() {
    
    //  console.log(this.profile_UserIdGet, 'iiii');
     
    this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      ​​​user_name:this.getLocalSecrectUrl.data.​​​user_name
      }

    this.accTypeAftPay = this.getLocalSecrectUrl.data.pay_name;

    // this.profileVerification = {
    //   profile_flag:localStorage.getItem("​​​profile_flag")
    // }

    // this.memberShipStatus = {
    //   payStatus:localStorage.getItem("plan_id"),
    //   pay_name:localStorage.getItem("pay_name")
    //   }

    this.memberShipStatus = {
      payStatus:this.getLocalSecrectUrl.data.plan_id,
      pay_name:this.getLocalSecrectUrl.data.pay_name
      }
      
this.profile_UserId = this.profile_UserId_new;



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
this.field_field_Sports_OBJ = dynamic_data.field_field_Sports;

this.field_Preferred_Movies_OBJ = dynamic_data.field_Preferred_Movies;

this.field_Spoken_Languages_OBJ = dynamic_data.field_Spoken_Languages;


  // this.localstorageDT = {
  // id:localStorage.getItem("id"),
  // ​​​user_name:localStorage.getItem("​​​user_name")
  // }
  



  setTimeout(()=>{
    this.verifyDivPause =false;
  }, 2000)

  
  this.imageBaseUrl = environment.api_url + '/uploads/';

  this.get_Family_DetailsDtls_LoginUser();
 
  this.get_Family_DetailsDtls();
  this.partners_Rashi_details_Get();
  this.get_GroomLocation_ProfInfoDtls();
  this.get_Hobbies_Dtls();
  this.get_Partner_PreferencesDtls(); 
  this.get_Single_Photo_login_user();
  this.get_Single_Photo();
  this.getGalleryPhoto();

  this.get_ownProfileMatchDt1();
  this.get_ownProfileMatchDt2();
  this.get_favlist()
// console.log(this.memberShipStatus);
const queryString = `own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`;
// console.log(queryString,'queryString')
  }

  goBack(): void {
    this.location.back();
  }


  imgSrc:any = String;
  onClick(event:any){
    const imgElem = event.target;
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;
  }

  get_ownProfileMatchDt1(){
    this.service.global_service(0, '/profile/user_groom_loc', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.ownProfileMatchDt1 = JSON.parse(responseData)[0]
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


  get_Family_DetailsDtls(){
    
    // this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {

    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.user_basic_info = JSON.parse(responseData);
      this.user_basic_info_New = JSON.parse(responseData)[0];
      console.log(this.user_basic_info_New,'user');
      

      

      this.age = this.datePipe.transform(this.user_basic_info_New?.dob, 'yyyy-MM-dd');
      if(this.age){

        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

      }
      

      })
  }

  get_GroomLocation_ProfInfoDtls(){
    this.service.global_service(0, '/profile/user_groom_loc', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.groomLoc_ProfInfo = JSON.parse(responseData)[0]
      // console.log(this.groomLoc_ProfInfo,'loca');
      

     
      })
  }

  get_Hobbies_Dtls(){
    this.service.global_service(0, '/profile/hobby', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.user_hobbi = JSON.parse(responseData);
      this.user_hobbi = this.user_hobbi[0];
      // console.log(this.user_hobbi,'hobby');
      
    })
  }


  get_Partner_PreferencesDtls(){
    this.service.global_service(0, '/partner/partner_pref', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.partners_info = JSON.parse(responseData)
      // console.log(this.partners_info,'partner');
      
      })
  }

  customOptions: OwlOptions = {
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

  getGalleryPhoto(){
    this.service.global_service(0, '/kyc/get_profile_pic', `user_id=${this.profile_UserId}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.galleryPhoto = JSON.parse(responseData)
      // this.galleryPhoto = responseData;
      // this.listOfFiles.push(this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile)));

      
      })


      
  }

  get_Single_Photo(){
    
    
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
      
  }


  get_Family_DetailsDtls_LoginUser(){
    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.userData_1_LoginUser = JSON.parse(responseData)
      // console.log(this.userData_1_LoginUser[0],'userData_1_LoginUser');
      
      // this.memberShipStatus.payStatus = true
      // this.changeWishBtnState()
      })
  }

  // loded_single_img_login_user:any;
  // listOfFiles_single_login_user: any[] = [];

  get_Single_Photo_login_user(){
    
    
    this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
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
      
  }

  partners_Rashi_details_Get(){
    
    
    this.service.global_service(0, '/partner/partner_match_marks', `own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
      // ?own_id=&partner_id=
      // var responseDataSingle:any;
      this.partnersRasi_get = data;
      this.singlePartnDetailsPop_newAray = this.partnersRasi_get;
      // responseDataSingle = responseDataSingle.suc > 0 ? atob(responseDataSingle.msg) : false;
      // this.partnersRasi_get = JSON.parse(responseDataSingle);
      
      
      const dt1=this.partnersRasi_get.partner;
      const dt2=dt1.basic_information;
      const dt3=dt2.value[0];
      const dt4=dt3.profile_verify_flag;
      this.profile_flag=dt4;
  
       
        
      })
      
  }
  nameShort(mobile:any){
    const mobileNumber = mobile;
    const firstFourNumbers = mobileNumber?.slice(0, 2);
    return firstFourNumbers + 'XXXXXXXX';
  }
  emailShort(email:any){
    const inputemail = email;
    const [username, domain] = inputemail?.split('@');
    const maskedUsername = username.charAt(0) + 'x'.repeat(username.length - 1);
    return `${maskedUsername}@${domain}`;
    // const firstFourNumbers = mobileNumber.slice(0, 4);
    // return firstFourNumbers + 'XXXXXX';
  }

  showAstroPopup(){
    
    this.inProgressShortPopup = true; 

    this.service.global_service(0, '/partner/partner_match_marks', `own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
      this.partner_match_Marks = data;
  
      
      
  
      if(this.partner_match_Marks.suc > 0){
  
      
      
  
      this.inProgressShortPopup = false; 
      this.profilePercentageCal();

    } else {
        this.msgService.errorMsg('ES');
        this.inProgressShortPopup = true; 
      }
      
  
      })
  
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
get_favlist(){
  this.service.global_service(0, '/partner/get_fav_list', `own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
    // this.changeButtonStatus(data.msg[0]?.flag);
    // console.log(data.msg[0]?.flag,'flag');
    if(data.suc > 0){
    this.changeButtonStatus(data.msg.length > 0 ? (data.msg[0]?.flag != 'N' ? true : false) : false);
    }
   

})
}

// changeButtonStatus = (length: number) =>{
//   if(length > 0){
//     this.buttonColor = this.buttonColor == 'red' ? '#B2BEB5' : 'red';
//     //  this.buttonColor = length > 0 ? 'red' : '#B2BEB5';
//   }
// }


// changeButtonStatus = (flag: "Y" | "N") =>{
changeButtonStatus = (flag: true | false) =>{
  this.flag = flag;
}


  enableButton(clickedFlag) {
  // if(this.memberShipStatus.payStatus != '0'){
    this.updateList ={
      field_own_id:this.localstorageDT.id,
      field_partner_id:this.profile_UserId,
      // field_flag:'Y',
      field_flag:clickedFlag ? 'Y' : 'N',
      user_name:this.getLocalSecrectUrl.data.user_name,
      }
      // console.log(this.updateList,'updatelist');
      
      this.service.global_service(1, '/partner/update_fav_list',this.updateList).subscribe((data: any)=>{
        // console.log(data,'res_updateList');
        if(data.suc == 1){
          this.msgService.successMsg('ADD_WISHLIST')
          this.changeButtonStatus(clickedFlag);
          if(!clickedFlag){
            this.msgService.errorMsg('DLT_WISHLIST')
            this.service.global_service(0, '/partner/delete_fav_list',`own_id=${this.localstorageDT.id}&partner_id=${this.profile_UserId}`).subscribe((data:any) => {
              // console.log(data,'delete_fav_list');
            })
          }
          
        } 
      })
    
  // }
  // else{
  //   this.updradebtn= true
  // }
  }

//   changeWishBtnState(){
//     // if(this.memberShipStatus.payStatus)
//     // {
//     // this.buttonColor = 'red';
//     // console.log(this.memberShipStatus,'membership');
//     // }
//     // else{
//     //   alert("Upgrade Now")
//     // console.log(this.memberShipStatus,'membership');
//     // }
//     //  this.isbtnclicked =  !this.isbtnclicked
//     //  this.buttonText = this.isbtnclicked ?  this.buttonColor = 'red' :  this.buttonColor = '#B2BEB5';

// // console.log(this.isbtnclicked);

//     if(!this.isbtnclicked){
//       this.buttonColor = 'red'
//       this.isbtnclicked = true
//       console.log(this.isbtnclicked);
      
//     }
//     else{
//       this.buttonColor = '#B2BEB5'
//       this.isbtnclicked = false
//       console.log(this.isbtnclicked);
//     }
//     this.isbtnclicked = this.isbtnclicked; 
//   }
}
