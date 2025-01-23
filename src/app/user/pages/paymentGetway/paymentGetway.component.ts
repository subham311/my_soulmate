import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';
import { Location } from '@angular/common';

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


  constructor(private service:DataService, private router:Router, private msgService: MessageService, private sds:SecrectDataService, private location: Location) { }

  ngOnInit() {

    // this.memberShipStatus = {
    // payStatus:localStorage.getItem("plan_id"),
    // pay_name:localStorage.getItem("pay_name")
    // }

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

    this.subscriptionDetails();

  }

  goBack(): void {
    this.location.back();
  }

  
  closeEditePopup(){
    document.getElementById('popup_Id').classList.remove('offerPopup_Active');
    document.getElementById('popup_Background').classList.remove('offerPopup_background_Active');
  }

  subscriptionDetails(){
    this.service.global_service(0, '/subscription/get_subscription_dtls/', null).subscribe((data:any) => {
      var responseData:any;
      this.paymentDetails = JSON.parse(atob(data.msg));

      })
  }



  membership(event:any){
    
    this.router.navigate(['/user/paymentdetails', btoa(event + '&'+ Math.random() * 100)]);

    
  }

}
