import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { user_basic_info } from 'src/app/Model/user_dtls';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { DataService } from 'src/app/Services/data.service';
import { MessageService } from 'src/app/Services/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-after_login_header_Global',
  templateUrl: './after_login_header_Global.component.html',
  styleUrls: ['./after_login_header_Global.component.css']
})
export class After_login_header_GlobalComponent implements OnInit {


  @Input() isVisible: boolean = true;

  @Input() accountType = '';


  
  /**
   * SUMAN MITRA
   */

  userData_1:user_basic_info;


  /**
   * 
   * @param service 
   * @param router 
   * @param msgService 
   */
  constructor(private service:DataService, private router:Router,private route: ActivatedRoute, private msgService: MessageService, private sds:SecrectDataService, private sanitizer: DomSanitizer) {

   }

  // userData_1:any;
  localstorageDT:any;
  memberShipStatus:any;
  profileVerification:any

  imageBaseUrl:any;
  loded_single_img:any;
  listOfFiles_single: any[] = [];

  is_loader_Thum:any = Boolean;

  // afterLoginUserDetGet:any;
  afterLoginUserThumGet:any;
  // afterLoginUserMemberGet:any;

  is_loader:any = Boolean;
  profile_UserId:any
  user_basic_info:any
  user_basic_info_New:any

  subscripStatus:any;

  pay_nameSubscrip:any;

  getLocalSecrectUrl = this.sds.getLocalSecrectData(); 
  paymentDetails:any;
  offet_text:any;


  @Output() loginUserPhotoData : EventEmitter<string> = new EventEmitter();
  // @Output() loginUserPhotoData : EventEmitter<any[]> = new EventEmitter();
  childData = "Data From Child Component";

  ngOnInit() {

    

    this.profileVerification = {
      profile_flag:this.getLocalSecrectUrl.data.profile_flag
    }


    this.memberShipStatus = {
      payStatus:this.getLocalSecrectUrl.data.plan_id,
      pay_name:this.getLocalSecrectUrl.data.pay_name
      }  



     this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      user_name:this.getLocalSecrectUrl.data.user_name
     }

     this.is_loader_Thum = true;

     this.service.afterLoginUserThumSend.subscribe((res)=>{
      this.afterLoginUserThumGet = res;
      if(this.userData_1){
        this.userData_1.file_path = res;
        this.is_loader_Thum = false;
      }
    });



    // this.loginUserPhotoData.emit(this.childData);


    this.subscriptionDetails();

    this.get_offer_text();

    this.get_Family_DetailsDtls();

    this.imageBaseUrl = environment.api_url + '/uploads/';
    // this.get_Single_Photo();

  }



  logout_Fnc(){

    localStorage.clear();
 
    this.router.navigate(['/home'])
  }


  get_Family_DetailsDtls(){
    // this.service.global_service
    // (0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`)
    // .subscribe((data:any) => {
    //   var responseData:any;
    //   responseData = data;
    //   responseData = responseData.suc > 0 ? atob(responseData.msg) : false
    //   this.userData_1 = JSON.parse(responseData)
    //   })

    this.service.global_service
    (0, '/profile/user_basic_info', `user_id=${this.localstorageDT.id}`)
    .pipe(map((item: any) => item.msg))
    .subscribe((data:string) => {
      // var responseData:any;
      // responseData = data;
      // responseData = responseData.suc > 0 ? atob(responseData.msg) : false
      // this.userData_1 = JSON.parse(responseData)
      this.userData_1 =  JSON.parse(atob(data))[0];
      // localStorage.setItem("user_country",this.userData_1.country_name);

      this.sds.setLocalSecrectData({user_country: this.userData_1.country_name})

      this.is_loader = false;
      this.is_loader_Thum = false;
      })
  }

  // get_Single_Photo(){
  //   this.is_loader_Thum = true;
  //   this.service.global_service(0, '/profile/profile_pic', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
  //     var responseData:any;
  //     responseData = data;
  //     responseData = responseData.suc > 0 ? atob(responseData.msg) : false
  //     this.loded_single_img = JSON.parse(responseData);
  
  
  //       this.listOfFiles_single.length = 0
  //       for(let dt of this.loded_single_img){
  //         this.listOfFiles_single.push({id:dt.id, filePath: dt.file_path})
  //         this.is_loader_Thum = false;
  //         this.loginUserPhotoData.emit(this.listOfFiles_single)
  //       }
        
  //     })
      
  // }

  subscriptionDetails(){
    this.service.global_service(0, '/subscription/get_subscription_dtls/', null).subscribe((data:any) => {
      var responseData = data.suc;
      if(responseData > 0){
        this.paymentDetails = JSON.parse(atob(data.msg));
        // this.paymentDetails = [
        //   {
        //     "id": 1,
        //     "pay_name": "Basic",
        //     "sub_id": 1,
        //     "actual_price": 3700,
        //     "discount": 10,
        //     "amount": 3700,
        //     "tennure_period": 3,
        //     "dtls": [
        //       {
        //         "sub_id": 1,
        //         "subscription_dtls": "Browse profiles"
        //       },
        //       {
        //         "sub_id": 1,
        //         "subscription_dtls": "View detailed information"
        //       },
        //       {
        //         "sub_id": 1,
        //         "subscription_dtls": "View contact details"
        //       }
        //     ]
        //   },
        //   {
        //     "id": 2,
        //     "pay_name": "Standard",
        //     "sub_id": 2,
        //     "actual_price": 6400,
        //     "discount": 10,
        //     "amount": 6400,
        //     "tennure_period": 6,
        //     "dtls": [
        //       {
        //         "sub_id": 2,
        //         "subscription_dtls": "Browse profiles"
        //       },
        //       {
        //         "sub_id": 2,
        //         "subscription_dtls": "View detailed information"
        //       },
        //       {
        //         "sub_id": 2,
        //         "subscription_dtls": "View contact details"
        //       }
        //     ]
        //   },
        //   {
        //     "id": 3,
        //     "pay_name": "Premium",
        //     "sub_id": 3,
        //     "actual_price": 10900,
        //     "discount": 10,
        //     "amount": 10900,
        //     "tennure_period": 12,
        //     "dtls": [
        //       {
        //         "sub_id": 3,
        //         "subscription_dtls": "Browse profiles"
        //       },
        //       {
        //         "sub_id": 3,
        //         "subscription_dtls": "View detailed information"
        //       },
        //       {
        //         "sub_id": 3,
        //         "subscription_dtls": "View contact details"
        //       }
        //     ]
        //   }
        // ]

        
        
      }

      })
  }

  get_offer_text(){
    this.service.global_service(0, '/subscription/get_discount_text_dtls/', null).subscribe((data:any) => {
      var responseData = data.suc;
      if(responseData > 0){
        var offet_text_txt = JSON.parse(atob(data.msg));
        this.offet_text = this.sanitizer.bypassSecurityTrustHtml(offet_text_txt[0].discount_text)

        // document.querySelector('#dynamicText').textContent = this.offet_text
        


        // alert()
        
        
      }

      })
  }

}
