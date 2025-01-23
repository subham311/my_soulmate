import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';
import { dynamic_data } from 'src/dynamic_data/dynamic_data';
import { MessageService } from 'src/app/Services/message.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  localstorageDT: any;
  dataArray: any
  imageBaseUrl: any;
  field_height_OBJ:any;
  profile_UserId:any;
  public inProgressShort: boolean = true;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    nav: true,
    navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],
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

  constructor(private route: ActivatedRoute,private router: Router, private sds: SecrectDataService, private service: DataService,private msgService: MessageService, private location: Location) { }
  getLocalSecrectUrl = this.sds.getLocalSecrectData();

  goBack(): void {
    this.location.back();
  }
  
  ngOnInit() {
    this.field_height_OBJ = dynamic_data.field_height;
    this.localstorageDT = {
      id: this.getLocalSecrectUrl.data.id,
      user_name: this.getLocalSecrectUrl.data.user_name
    }
    // console.log(this.localstorageDT, 'id');

    this.service.global_service(0, '/partner/add_wishlist', `own_id=${this.localstorageDT.id}`).subscribe((data: any) => {
      // console.log(data.msg, 'add_wishlist');
      this.dataArray = data.msg
      console.log(this.dataArray,'add_wishlist');

      for(let i=0; i<this.dataArray.length; i++) {
        if(this.dataArray.payStatus > 0){
          this.dataArray[i]['freetoSee'] = 1;
        }else{
          this.dataArray[i]['freetoSee'] = 0;
  
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
  
      
      
      // console.log(this.dataArray[0]?.basic_information.value[0]?.gender, 'dataArray');
      if(data.suc > 0){
      this.inProgressShort=false
      }
      else if(data.msg.length == 0)
      {
        this.inProgressShort=false
      }


    })
    this.imageBaseUrl = environment.api_url + '/uploads/';
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

  enableButton(userId:any,index:number) {
            this.service.global_service(0, '/partner/delete_fav_list',`own_id=${this.localstorageDT.id}&partner_id=${this.dataArray[0].basic_information.value[0]?.id}`).subscribe((data:any) => {            
              // console.log(data,'delete_fav_list');
              if(data.suc > 0){
                this.dataArray.splice(index,1);
                this.msgService.errorMsg('DLT_WISHLIST')
              }
              else{
                this.msgService.errorMsg('ED')
              }
              
            }) 
    }

} 
