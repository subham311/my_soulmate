import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/Services/message.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload_photo',
  templateUrl: './upload_photo.component.html',
  styleUrls: ['./upload_photo.component.css']
})
export class Upload_photoComponent implements OnInit {

  // fileList: File[] = [];
  fileList: any = [];
  listOfFiles: any[] = [];
  isLoading = false;
  responGallery:any;

  fileList_single: any = [];
  listOfFiles_single: any[] = [];
  isLoading_single = false;
  responGallery_single:any;

  localstorageDT:any

  lodedGalleryImg:any;
  loded_single_img:any;

  imageBaseUrl:any;
  imgDelResp:any;

  isDisabled =true;
  isShow =true;

  submit_isDisabled =true;
  upload_isDisabled =false;

  name = 'Angular';
  imageChangedEvent: any;
  croppedImage: any;
  croppedImage2:any;

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
  formData:any;


  
  getLocalSecrectUrl= this.sds.getLocalSecrectData();

  alertBoxTxt =  'Do you want to delete permantly?';

  constructor(private service:DataService, private router:Router, private msgService: MessageService, private sanitizer: DomSanitizer, private sds:SecrectDataService, private matDialog:MatDialog, private location: Location) { }

  ngOnInit() {

  // this.localstorageDT = {
  // id:localStorage.getItem("id"),
  // user_name:localStorage.getItem("​​​user_name")
  // }

  this.localstorageDT = {
  id: this.getLocalSecrectUrl.data.id,
  user_name: this.getLocalSecrectUrl.data.​​​user_name
  }

  this.imageBaseUrl = environment.api_url + '/uploads/';

  

  this.getGalleryPhoto();
  this.get_Single_Photo();

  }

  goBack(): void {
    this.location.back();
  }
  
// fileChangeEvent(event: any): void {
//   this.imageChangedEvent = event;
// }


// Multiple images upload

onMultyplPhotSele(event: any) {

  

  this.upload_isDisabled = false;
  this.isLoading = true;
  this.isShow = true;

  if(event.target.files.length > 0 && event.target.files.length <= 5){
    this.isDisabled =false;
  } 
  
  if(event.target.files.length > 5){
    this.isShow =false;
  }
    
  
  
  for (var i = 0; i <= event.target.files.length - 1; i++) {
    
    var selectedFile = event.target.files[i];
    
    
    if(selectedFile.type == 'image/png' || selectedFile.type == 'image/jpeg' || selectedFile.type == 'image/jpg'){

      this.fileList.push(selectedFile);

      this.listOfFiles.push({id: 0, filePath: this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile)), index: i});
      this.msgService.successMsg('PHOTO_UP_CORECT');
    } else {
      this.msgService.errorMsg('PHOTO_NOTUP_CORECT');
    }
    

      if(this.listOfFiles.length >= 0 && this.listOfFiles.length <= 5){
        this.submit_isDisabled = false;
        this.upload_isDisabled = true;
      } else {
        this.submit_isDisabled = true;
        this.upload_isDisabled = false;
      }

    }

  this.isLoading = false;

  this.uploadMUltyImg()

}


removeMultyImg(index:any, id:any, fileIndex:any) {

  const dialogRef = this.matDialog.open(DialogBodyComponent, {
    width:'350px',
    // height:'200px',
    data: {name: this.alertBoxTxt}
    })
  
  
    dialogRef.afterClosed().subscribe(result => {
    console.log(result, 'this.animal');
  
    if(result == 'true'){
      
      if(id > 0){
        this.service.global_service(0, '/kyc/single_pic_delete', `id=${id}`).subscribe((data:any) => {
          this.imgDelResp=data
  
          
          
          
          if(this.imgDelResp.suc > 0){
            this.listOfFiles.splice(index, 1);
            
          }
        })
      }else{
  
        this.listOfFiles.splice(index, 1);
        fileIndex >= 0 ? this.fileList.splice(fileIndex, 1) : '';
  
        if(this.listOfFiles.length <= 5){
          this.submit_isDisabled = false;
        }
  
        if(this.listOfFiles.length < 1){
          this.submit_isDisabled = true;
        }
  
      }
      
    } 
    if(result == 'false'){
  
    }
  
    });

}


getGalleryPhoto(){
  
  
  this.service.global_service(0, '/kyc/get_profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
    var responseData:any;
    responseData = data;
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.lodedGalleryImg = JSON.parse(responseData)
    if(this.lodedGalleryImg.length > 0){
      this.listOfFiles.length = 0
      for(let dt of this.lodedGalleryImg){
        this.listOfFiles.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
      }



      // this.listOfFiles.length = 0;
      
    }
    })

    
}

// this.fileList.length = 0;

uploadMUltyImg(){
  this.formData = new FormData();
  for(let dt of this.fileList){
    this.formData.append('prof_img', dt);
  }
  
  this.formData.append('user_id',this.localstorageDT.id)
  this.formData.append('user',this.localstorageDT.user_name)
  this.formData.append('edite_Flag','1' )


  // console.log(this.formData, 'this.formData');
  
  

// if(this.fileList.length > 0){

if(this.listOfFiles.length > 0 && this.listOfFiles.length <= 5){
  this.isDisabled =false;

  this.service.global_service(1, '/kyc/profile_pic', this.formData).subscribe(data=>{
    this.responGallery = data
    if(this.responGallery.suc > 0){
      // this.msgService.successMsg('SU')
      this.fileList = [];
      this.isDisabled =true;
      this.getGalleryPhoto()
    } else {
      this.msgService.successMsg('EU')
    }
  })

}


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
  this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
    var responseData:any;
    responseData = data;
    responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    this.loded_single_img = JSON.parse(responseData);




      this.listOfFiles_single.length = 0
      for(let dt of this.loded_single_img){
        this.listOfFiles_single.push({id:dt.id, filePath: this.imageBaseUrl + dt.file_path})
      }

    })

    
    
}


   open_crop_modal() {
    this.el = document.getElementById("id01");
    this.el.style.display = "block";
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
    this.el.style.display = "none";
    
    const formData2 = new FormData();
    formData2.append('profile_img', this.img_cover);
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
    this.aspect_ratio = "3/2";
    this.contain_within_aspect_ratio = false;
    this.crop_height = 500;
    this.crop_min_height = 200;
    this.crop_width = 600;
    this.crop_min_width = 180;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();

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
