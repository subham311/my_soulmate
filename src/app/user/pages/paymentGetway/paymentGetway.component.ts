import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-paymentGetway',
  templateUrl: './paymentGetway.component.html',
  styleUrls: ['./paymentGetway.component.css']
})
export class PaymentGetwayComponent implements OnInit {

  memberShipStatus:any;

  sendMemberData:any;
  sendMemberDataRespons:any;

  localstorageDT:any;

  paymentDetails:any;
  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 

  // offerForValentine_start = "2024-02-05";
  // offerForValentine_Exp = "2024-02-15";
  // todays_date_Offer = new Date().toISOString();

  // todays_date_Offer_:any;
  // offerForValentine_start_:any;
  // offerForValentine_Exp_:any;


  constructor(private service:DataService, private router:Router, private msgService: MessageService, private sds:SecrectDataService) { }



  ngOnInit() {

    // this.memberShipStatus = {
    // payStatus:localStorage.getItem("plan_id"),
    // pay_name:localStorage.getItem("pay_name")
    // }

    // document.getElementById('popup_Id')?.classList.add('offerPopup_Active');
    // document.getElementById('popup_Background')?.classList.add('offerPopup_background_Active');

    this.memberShipStatus = {
      payStatus: this.getLocalSecrectUrl.data.plan_id,
      pay_name:this.getLocalSecrectUrl.data.pay_name
      }


    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   ​​​user_name:localStorage.getItem("​​​user_name")
    //  }

    this.localstorageDT = {
      id: this.getLocalSecrectUrl.data.id,
      ​​​user_name: this.getLocalSecrectUrl.data.​​​user_name
     }


    if(this.memberShipStatus.payStatus == 'Y'){
      this.router.navigate(['/user/user_dashboard']);
      // 09/11/2023
    }


// this.todays_date_Offer_ = Date.parse(this.todays_date_Offer); 
// this.offerForValentine_start_ = Date.parse(this.offerForValentine_start); 
// this.offerForValentine_Exp_ = Date.parse(this.offerForValentine_Exp);

// console.log(this.offerForValentine_start_ <= this.todays_date_Offer_ && this.offerForValentine_Exp_ >= this.todays_date_Offer_ , 'newwwwwwwwwwwwwww');
// console.log(this.offerDiscount > 0, 'newwwwwwwwwwwwwww');



    this.subscriptionDetails();

  }

  closeEditePopup(){
    document.getElementById('popup_Id').classList.remove('offerPopup_Active');
    document.getElementById('popup_Background').classList.remove('offerPopup_background_Active');
  }

  subscriptionDetails(){
    this.service.global_service(0, '/subscription/get_subscription_dtls/', null).subscribe((data:any) => {
      var responseData:any;
      this.paymentDetails = JSON.parse(atob(data.msg));

      // console.log(data, 'this.paymentDetails');
      

      })
  }



  membership(event:any){
    
    this.router.navigate(['/user/paymentdetails', btoa(event + '&'+ Math.random() * 100)]);

    
  }

}
