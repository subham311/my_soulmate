import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { DomSanitizer } from '@angular/platform-browser';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { user_basic_info, user_groom_loc } from 'src/app/Model/user_dtls';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-leftBar_after_login',
  templateUrl: './leftBar_after_login.component.html',
  styleUrls: ['./leftBar_after_login.component.css']
})



export class LeftBar_after_loginComponent implements OnInit {

  userData_1:any;
  localstorageDT:any;

  searchData_obj:any;

  locationData_dropdown:any;
  lang_list:any; 
  state_shorting = new Array();
  city_short_by_state = new Array();

  hideOtheres=true;

  age:any;
  showAge:any;

  searchPartner = new FormGroup({
    // field_About_us: new FormControl('',[Validators.required, Validators.minLength(10)])
    sear_frm_age: new FormControl('', [Validators.required]),
    sear_to_age: new FormControl('', [Validators.required]),
    sear_religion: new FormControl(''),
    sear_mari_stat: new FormControl(''),
    sear_moth_ton: new FormControl(''),
    sear_Country: new FormControl(''),
    sear_state: new FormControl(''),
    sear_city: new FormControl(''),
  });

  ageList: any = [];
  ageToList: any = [];
  memberShipStatus:any;

  



  name = 'Angular';
  imageChangedEvent: any;
  croppedImage: any;
  croppedImage2:any;

  imageBaseUrl:any;
  loded_single_img:any;
  listOfFiles_single: any[] = [];

  fileList_single: any = [];
  isLoading_single = false;
  responGallery_single:any;

  // fileList: File[] = [];
  fileList: any = [];
  listOfFiles: any[] = [];
  isLoading = false;
  responGallery:any;



  lodedGalleryImg:any;

  imgDelResp:any;

  isDisabled =true;

  testImg:any;
  scale: any;
  transform:  ImageTransform = {};
  showCropper: any;
  modal: any;
  hide: any;
  valu: any;
  show_tab: any;
  preview_for_section: any;
  img_cover: any;
  modal_close_oncrop: any;
  isSave: any = false;
  profileImgName: any;
  img_name: any;
  logo_file1: any;
  el: any;
  crop_width: any;
  aspect_ratio: any;
  contain_within_aspect_ratio = true;
  crop_height: any;
  crop_min_height:any;
  crop_min_width:any;
  cropround = false;

  countryList = new Array();
  stateList = new Array();
  cityList = new Array();


  groomLoc_ProfInfo_New:user_groom_loc;
  user_basic_info_New:user_basic_info;
  user_hobbi:any;
  partners_info:any;
  progressValue:any;

  is_loader:any = Boolean;

  is_loader_Thum:any = Boolean;

  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 

  upload_Thum_Image_Width:any;
  upload_Thum_Image_Height:any;


  constructor(private service:DataService, private router:Router, private msgService: MessageService, private datePipe: DatePipe, private sanitizer: DomSanitizer, private sds:SecrectDataService) { 



  }

  

  ngOnInit() {

    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   user_name:localStorage.getItem("​​​user_name")
    //  }

    this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      user_name:this.getLocalSecrectUrl.data.​​​user_name
     }

    //  this.memberShipStatus = {
    //   payStatus:localStorage.getItem("plan_id"),
    //   pay_name:localStorage.getItem("pay_name")
    // }

    this.memberShipStatus = {
      payStatus:this.getLocalSecrectUrl.data.plan_id,
      pay_name:this.getLocalSecrectUrl.data.pay_name
    }

    this.router.events.subscribe(() => {
      if(this.router.url == '/profile_list'){
        this.hideOtheres = true;
      }else{
        this.hideOtheres = false;
      }
      
    })


    for(let i = 18; i < 51; i++){
      this.ageList.push(i)
     }
     
    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   ​​​user_name:localStorage.getItem("​​​user_name")
    //  }

    this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      ​​​user_name:this.getLocalSecrectUrl.data.user_name
     }

     this.service.global_service(0, '/master/countries_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      responseData = responseData ? JSON.parse(responseData) : 'Error occures in API'
      this.countryList = responseData;
      this.countryList = this.countryList.sort((a, b)=> a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      
      })

      

     this.service.global_service(0, '/master/lang_list', null).subscribe((data:any) => {
      var responseData:any;
      responseData = data
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.lang_list = JSON.parse(responseData)
      })

      this.service.global_service(0, '/master/location_list', null).subscribe((data:any) => {
        var responseData:any;
        responseData = data
        responseData = responseData.suc > 0 ? atob(responseData.msg) : false
        this.locationData_dropdown = responseData ? JSON.parse(responseData) : 'Error occures in API';
  
    
        this.locationData_dropdown.forEach((item:any)=> {
          
  
          var existing = this.state_shorting.filter(function(v:any, i:any) {
            return v.name == item.name;
          });
          
          if (!existing.length) {
          this.state_shorting.push(item);
          
          }
        });
        })


    this.get_Family_DetailsDtls();

    this.imageBaseUrl = environment.api_url + '/uploads/';
    this.get_Single_Photo();
    this.completeProfileProgress();
    this.getGalleryPhoto();

  }

  gotoViewProfile(userId:any){
    this.router.navigate(['/user/portfolio_view', btoa(userId)]);
  }

  generateAgeToList(e:any){
    this.ageToList.length = 0
    for(let i = parseInt(e.value)+1; i < 61; i++){
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

  
// onChangeState(event:any) {
  
//   this.city_short_by_state = this.locationData_dropdown.filter((dt:any) => dt.state == event.value);
// }

completeProfileProgress(){

  this.service.global_service(0, '/profile/user_groom_loc', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  var responseData:any;
  responseData = data;
  responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  this.groomLoc_ProfInfo_New = JSON.parse(responseData)[0];

  this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  var responseData:any;
  responseData = data;
  responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  this.user_basic_info_New = JSON.parse(responseData)[0]

  this.service.global_service(0, '/profile/user_hobbies', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  var responseData:any;
  responseData = data;
  responseData = responseData.suc > 0 ? atob(responseData.msg) : false;
  this.user_hobbi = JSON.parse(responseData);

  this.service.global_service(0, '/partner/partner_pref', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  var responseData:any;
  responseData = data;
  responseData = responseData.suc > 0 ? atob(responseData.msg) : false;
  this.partners_info = JSON.parse(responseData);
  
  this.is_loader = false;

  this.addProfileMatchpercentage(this.user_basic_info_New, this.user_hobbi, this.partners_info, this.groomLoc_ProfInfo_New);
  
  })

  })
  })

  })

}


getGalleryPhoto(){
  
  
  this.service.global_service(0, '/kyc/get_profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
    var responseData:any;
    responseData = data;
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    
    this.lodedGalleryImg = JSON.parse(responseData);
    
    if(this.lodedGalleryImg.length > 0){
      this.listOfFiles.length = 0
      for(let dt of this.lodedGalleryImg){
        this.listOfFiles.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
      }
      // this.listOfFiles.length = 0;
    }
   
    
    })

    
}



addProfileMatchpercentage(user_basic_info_New, user_hobbi, partners_info, groomLoc_ProfInfo_New){
  
  let incrementItem = 0;
  let defaultValue = 40;
  let increMentVal = ((100-defaultValue)/20);
  
if(user_basic_info_New?.body_type != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.weight != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.drinking_habbits != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.eating_habbits != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.smoking_habbits != null){
  incrementItem = incrementItem + increMentVal;
}

if(groomLoc_ProfInfo_New?.collage != null){
  incrementItem = incrementItem + increMentVal;
}

if(groomLoc_ProfInfo_New?.occup_in_dtls != null){
  incrementItem = incrementItem + increMentVal;
}

if(groomLoc_ProfInfo_New?.org_name != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.father_occupation != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.mother_occupation != null){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.family_location != null){
  incrementItem = incrementItem + increMentVal;
}
if(user_basic_info_New?.profile_verify_flag != 'N'){
  incrementItem = incrementItem + increMentVal;
}

if(user_hobbi?.field_Hobbies_Interests.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(user_hobbi?.field_Music.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(user_hobbi?.field_Sports.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(user_hobbi?.field_Preferred_Movies.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(user_hobbi?.field_Spoken_Languages.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(user_basic_info_New?.about_my_family != null){
  incrementItem = incrementItem + increMentVal;
}

if(partners_info.length != 0){
  incrementItem = incrementItem + increMentVal;
}

if(this.loded_single_img[0].file_path != null){
  incrementItem = incrementItem + increMentVal;
}

if(this.lodedGalleryImg.length != 0){
  incrementItem = incrementItem + increMentVal;
}

return this.progressValue = Math.round(incrementItem + defaultValue);

}

  partnerSearch_fn(data){

    if(data == 'pushSarchData'){
    this.searchData_obj = {
      sear_frm_age: this.searchPartner.controls.sear_frm_age.value,
      sear_to_age: this.searchPartner.controls.sear_to_age.value,
      sear_religion: this.searchPartner.controls.sear_religion.value,
      sear_mari_stat: this.searchPartner.controls.sear_mari_stat.value,
      sear_moth_ton: this.searchPartner.controls.sear_moth_ton.value,
      sear_Country: this.searchPartner.controls.sear_Country.value,
      sear_state: this.searchPartner.controls.sear_state.value,
      sear_city: this.searchPartner.controls.sear_city.value
    }
    this.service.searchPartner.next(this.searchData_obj);
    }

    if(data == 'clearSarchData'){
      // this.searchData_obj = {
      //   sear_frm_age: null,
      //   sear_to_age: null,
      //   sear_religion: null,
      //   sear_mari_stat: null,
      //   sear_moth_ton: null,
      //   sear_Country: null,
      //   sear_state: null,
      //   sear_city: null
      // }
      // this.searchPartner.controls.sear_frm_age.value.toString = null
      // this.myReactiveForm.reset(this.myReactiveForm.value);
      this.searchPartner.reset();
      this.service.searchPartner.next(this.searchData_obj);
    }

  
  }





  leftNavFn(para:any){
    this.router.navigate([para])
  }

  logout_Fnc(){
    localStorage.clear()

    this.router.navigate(['/home']);
    
  }


  get_Family_DetailsDtls(){
    this.service.global_service(0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      this.userData_1 = JSON.parse(responseData)[0]

      // localStorage.setItem("​​​profile_code", this.userData_1.profile_id);
      this.sds.setLocalSecrectData({​​​profile_code: this.userData_1.profile_id})
      
//  Use Subject Behaibair For load time Show User Detail On the Header Start____________
      // this.service.afterLoginUserDetSend.next(this.userData_1);
//  Use Subject Behaibair For load time Show User Detail On the Header End____________


      this.age = this.datePipe.transform(this.userData_1.dob, 'yyyy-MM-dd');
      if(this.age){
        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      }

      })
  }

  ///////////////////////////////////////////////
   // open cropper

  on_Single_PhotSele(event: any) {
    // this.isLoading = true;
      
      var selectedFile = event.target.files[0];
      this.listOfFiles_single.length = 0;
      this.listOfFiles_single.push({id: 0, filePath: this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile))});
        
  
    // this.isLoading = false;
  
  
    const formData2 = new FormData();
      formData2.append('profile_img', selectedFile);
      formData2.append('user_id',this.localstorageDT.id)
      formData2.append('user',this.localstorageDT.user_name)
      formData2.append('edite_Flag','1' )
  
  
  
    this.service.global_service(1, '/profile/upload_profile_pic', formData2).subscribe(data=>{
    this.responGallery_single = data
  
    if(this.responGallery_single.suc > 0){
      this.msgService.successMsg('SU');
      this.get_Single_Photo()
    }
    
      
    })
  
  }

  get_Single_Photo(){
   

    this.is_loader_Thum = true;
    this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      var responseData:any;
      responseData = data;
      responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      
      this.loded_single_img = JSON.parse(responseData);
  
  
      
  
  
        this.listOfFiles_single.length = 0
        for(let dt of this.loded_single_img){
          // this.listOfFiles_single.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})  afterLoginUserThum
          this.listOfFiles_single.push({id:dt.id, filePath:  dt.file_path})
        }

        this.is_loader_Thum = false;
   

        //  Use Subject Behaibair For load time Show User Detail On the Header Start____________
        this.service.afterLoginUserThumSend.next(this.listOfFiles_single[0].filePath);
        //  Use Subject Behaibair For load time Show User Detail On the Header End____________
      })
      
  }


   open_crop_modal() {
    this.el = document.getElementById("id01");
    this.el.style.display = "block";
    // this.closeEditePopup()
  }
  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }
  // fired when the image to be cropped is loaded
  imageLoaded() {
    this.showCropper = true;
    this.modal = false;
    this.hide = false;
    this.valu = false;
    // this.Zoomout = false;
    // this.ZoomIn = false;
  }
  // fired when the image is cropped
  imageCropped(event: ImageCroppedEvent) {
    // event.width=this.crop_width;
    // event.width=this.crop_height;

    // console.log(event.width, 'wwwwwwww', event.height);
    // this.upload_Thum_Image_Width = event.width;
    // this.upload_Thum_Image_Height = event.height;
    
    

    this.croppedImage = event.base64;
    if (this.show_tab == "tab4") this.preview_for_section = this.croppedImage;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
  }
  // fired when the image load fails
  loadImageFailed() {
  }
  // close the cropper
  close_modal_on_crop() {
    this.modal_close_oncrop = document.getElementById("id01");
    this.modal_close_oncrop.style.display = "none";
  }
  closeEditePopup(){
    document.getElementById('popup_Id').classList.remove('popupAnimated_Edite_Active');
  }
  saveCroppedImg() {
    // this.cover_change=true;
    this.valu = true;
    this.img_cover = this.croppedImage;
    // CONVERT BASE64 TO IMAGE FILE //
    const base64 = this.croppedImage;
    const imageName = this.img_name;
    const imageBlob = this.dataURItoBlob(this.croppedImage);
    const imageFile = new File([imageBlob], imageName, { type: "image/png" });
    this.img_cover = imageFile;
    // END //
    // this.el.style.display = "none";
    
    const formData2 = new FormData();
    formData2.append('profile_img', this.img_cover);
    formData2.append('user_id',this.localstorageDT.id)
    formData2.append('user',this.localstorageDT.user_name)
    formData2.append('edite_Flag','1' )
    // console.log(formData2,'form');
    
    this.service.global_service(1, '/profile/upload_profile_pic', formData2).subscribe(data=>{
      this.responGallery_single = data

      if(this.responGallery_single.suc > 0){
    
    document.getElementById('popup_Id').classList.add('popupAnimated_Edite_Active');

      this.msgService.successMsg('SU');
       
      this.get_Single_Photo()
      this.el.style.display = "none";

      }
      
      
    })
  }
  dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.toString().split(",")[1]);

    const array = [];

    for (var i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {
      type: "image/png",
    });
  }

  section_img_upload(e: any) {
    this.cropround = false;
    // this.crop_width=1800;
    // this.aspect_ratio = "4 / 3";
    this.contain_within_aspect_ratio = false;
    this.crop_height = 650;
    this.crop_min_height = 450;
    this.crop_width = 550;
    this.crop_min_width = 350;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();

    // console.log('Img', e.target);

    // console.log('wwwwwwww', e);
    

    const filesToUpload = e.target.files;
    this.profileImgName = e.target.files[0].name;
    this.img_name = this.profileImgName;
    
    this.profileImgName = e;

    this.img_cover = this.profileImgName;
    this.logo_file1 = document.getElementById("logo_crop");
    // this.logo_file1.style.display = "block";
    this.logo_file1.click();
  }

}
