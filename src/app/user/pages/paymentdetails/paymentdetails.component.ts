import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent implements OnInit {

  orderIdMain:any;

  compulsoryInformation:any;
  redirectURL = 'http://localhost:4200/ccavResponseHandler';
  cancelURL = 'http://localhost:4200/ccavResponseHandler';
  currency = 'INR';
  language = 'EN';

  shipingForm_Show = true;

  paymentFormPatch:any;
  sendBillingData:any;
  localstorageDT:any;
  checkBoxOnchangeValue = false;
  accessCode = 'AVWF05KL38AI00FWIA'
  payUrl:any = false
  financialYea:any;

  paymentEncodedResponse:any = false;

  constructor(private service:DataService, private router:Router, private route: ActivatedRoute, private msgService: MessageService, private datePipe: DatePipe, protected _sanitizer: DomSanitizer, private sds:SecrectDataService) { }
  
  paymentForm = new FormGroup({
    // field_who_creat_profile: new FormControl('',[Validators.required]),
    // field_name: new FormControl('',[Validators.required]),
    
    // field_body_type: new FormControl('')
    billingName: new FormControl('',[Validators.required]),
    billingCity: new FormControl('',[Validators.required]),
    billingState: new FormControl('',[Validators.required]),
    billingAddress: new FormControl('',[Validators.required]),
    billingZip: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    billingCountry: new FormControl('',[Validators.required]),
    billingTel: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    billingEmail: new FormControl('',[Validators.required, Validators.email]),

    

    // shippingName: new FormControl(''),
    // shippingCity: new FormControl(''),
    // shippingState: new FormControl(''),
    // shippingAddress: new FormControl(''),
    // // shippingZip: new FormControl('',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    // shippingZip: new FormControl(''),

    // shippingCountry: new FormControl(''),
    // // shippingTel: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // shippingTel: new FormControl(''),


  });

  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 

  ngOnInit() {

    // this.paymentForm.controls.billingAddress.addValidators([Validators.required]);



    // if(this.checkBoxOnchangeValue === false){
    //   this.paymentForm.controls.shippingName.addValidators([Validators.required]);
    //   this.paymentForm.controls.shippingName.updateValueAndValidity();

    //   this.paymentForm.controls.shippingCity.addValidators([Validators.required]);
    //   this.paymentForm.controls.shippingCity.updateValueAndValidity();

    //   this.paymentForm.controls.shippingState.addValidators([Validators.required]);
    //   this.paymentForm.controls.shippingState.updateValueAndValidity();

    //   this.paymentForm.controls.shippingAddress.addValidators([Validators.required]);
    //   this.paymentForm.controls.shippingAddress.updateValueAndValidity();

    //   this.paymentForm.controls.shippingZip.addValidators([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
    //   this.paymentForm.controls.shippingZip.updateValueAndValidity();

    //   this.paymentForm.controls.shippingCountry.addValidators([Validators.required]);
    //   this.paymentForm.controls.shippingCountry.updateValueAndValidity();

    //   this.paymentForm.controls.shippingTel.addValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
    //   this.paymentForm.controls.shippingTel.updateValueAndValidity();
    // }
    

    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //   profile_id:localStorage.getItem("​​​profile_code"),
    //   ​​​user_name:localStorage.getItem("​​​user_name")
    //  }

    this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
      profile_id:this.getLocalSecrectUrl.data.​​​profile_code,
      ​​​user_name:this.getLocalSecrectUrl.data.​​​user_name
     }

    this.orderIdMain = atob(this.route.snapshot.paramMap.get('id'));

    const orderIdAray = this.orderIdMain.split("&");
    
    const packageId = orderIdAray[0];
    const packagePrice = orderIdAray[1];
    const packageName = orderIdAray[2];
    const packagePeriod = orderIdAray[3];
    const packageRandomNum = orderIdAray[4];

    this.compulsoryInformation = {
      merchantId:2985958,
      // orderId: new Date().getTime(),
      orderId: '',
      financialYea: this.financialYea,
      currency: this.currency,
      planName:packageName,
      amount:packagePrice,
      redirectURL:this.redirectURL,
      language: this.language,
      packageId: packageId,
      packagePeriod: packagePeriod
    }

    this.loadPaymentData();
    this.getCurrentFinancialYear();
  }




  getCurrentFinancialYear() {
    // var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      this.financialYea = (today.getFullYear() - 1) + "" + today.getFullYear()
    } else {
      this.financialYea = today.getFullYear() + "" + (today.getFullYear() + 1)
    }
    
    return this.financialYea
  }
  
  // document.getElementById("spFY").innerHTML=getCurrentFinancialYear();

  loadPaymentData(){
    this.paymentForm.patchValue({
      // field_About_us: this.user_basic_info_New?.about_us
    })
  }

  submit_subcriptionData(){

    this.sendBillingData =  {
      merchant_id: 2985958,
      order_id: this.compulsoryInformation.orderId,
      financial_yr: this.financialYea,
      currency: this.compulsoryInformation.currency,
      amount: this.compulsoryInformation.amount,
      // redirect_url: encodeURIComponent("http://202.21.38.178:3000/payRes"),
      // cancel_url: encodeURIComponent("http://202.21.38.178:3000/payRes"),
      redirect_url: encodeURIComponent("https://api.mysoulmate.co.in/payRes"),
      cancel_url: encodeURIComponent("https://api.mysoulmate.co.in/payRes"),
      language: this.compulsoryInformation.language,

      billing_name: this.paymentForm.controls.billingName.value,
      billing_address: this.paymentForm.controls.billingAddress.value,
      billing_city: this.paymentForm.controls.billingCity.value,
      billing_state: this.paymentForm.controls.billingState.value,
      billing_zip: this.paymentForm.controls.billingZip.value,
      billing_country: this.paymentForm.controls.billingCountry.value,
      billing_tel: this.paymentForm.controls.billingTel.value,
      billing_email: this.paymentForm.controls.billingEmail.value,


      // delivery_name: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingName.value : this.paymentForm.controls.shippingName.value,
      // delivery_address: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingAddress.value : this.paymentForm.controls.shippingAddress.value,
      // delivery_city: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingCity.value : this.paymentForm.controls.shippingCity.value,
      // delivery_state: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingState.value : this.paymentForm.controls.shippingState.value,
      // delivery_zip: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingZip.value : this.paymentForm.controls.shippingZip.value,
      // delivery_country: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingCountry.value : this.paymentForm.controls.shippingCountry.value,
      // delivery_tel: this.checkBoxOnchangeValue === true ? this.paymentForm.controls.billingTel.value : this.paymentForm.controls.shippingTel.value,

      delivery_name: this.paymentForm.controls.billingName.value,
      delivery_address: this.paymentForm.controls.billingAddress.value,
      delivery_city: this.paymentForm.controls.billingCity.value,
      delivery_state: this.paymentForm.controls.billingState.value,
      delivery_zip: this.paymentForm.controls.billingZip.value,
      delivery_country: this.paymentForm.controls.billingCountry.value,
      delivery_tel: this.paymentForm.controls.billingTel.value,
      
      merchant_param1: "",
      merchant_param2: "",
      merchant_param3: "",
      merchant_param4: "",
      merchant_param5: "",
      promo_code: "",

      customer_identifier: this.localstorageDT.id,
      user_id: this.localstorageDT.id,
      user: this.localstorageDT.user_name,
      pack_id: this.compulsoryInformation.packageId
  }


  
  ////////////////// END ////////////////////////
  this.paymentEncodedResponse = true
  this.sendBillingData = JSON.stringify(this.sendBillingData);
  // window.location.href = `http://202.21.38.178:3000/PayReq?data=${btoa(this.sendBillingData)}`;
  window.location.href = `https://api.mysoulmate.co.in/PayReq?data=${btoa(this.sendBillingData)}`;
  }



  // shipingSameOrNot(event){

  //   this.checkBoxOnchangeValue  = event.checked;

  //   if(this.checkBoxOnchangeValue === true){
  //     this.shipingForm_Show = false;

  //     this.paymentForm.controls.shippingName.clearValidators();
  //     this.paymentForm.controls.shippingName.updateValueAndValidity();

  //     this.paymentForm.controls.shippingCity.clearValidators();
  //     this.paymentForm.controls.shippingCity.updateValueAndValidity();

  //     this.paymentForm.controls.shippingState.clearValidators();
  //     this.paymentForm.controls.shippingState.updateValueAndValidity();

  //     this.paymentForm.controls.shippingAddress.clearValidators();
  //     this.paymentForm.controls.shippingAddress.updateValueAndValidity();

  //     this.paymentForm.controls.shippingZip.clearValidators();
  //     this.paymentForm.controls.shippingZip.updateValueAndValidity();

  //     this.paymentForm.controls.shippingCountry.clearValidators();
  //     this.paymentForm.controls.shippingCountry.updateValueAndValidity();

  //     this.paymentForm.controls.shippingTel.clearValidators();
  //     this.paymentForm.controls.shippingTel.updateValueAndValidity();

      
  //   }

  //   if(this.checkBoxOnchangeValue === false){
  //     this.shipingForm_Show = true;

  //     this.paymentForm.controls.shippingName.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingName.updateValueAndValidity();

  //     this.paymentForm.controls.shippingCity.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingCity.updateValueAndValidity();

  //     this.paymentForm.controls.shippingState.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingState.updateValueAndValidity();

  //     this.paymentForm.controls.shippingAddress.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingAddress.updateValueAndValidity();

  //     this.paymentForm.controls.shippingZip.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingZip.updateValueAndValidity();

  //     this.paymentForm.controls.shippingCountry.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingCountry.updateValueAndValidity();

  //     this.paymentForm.controls.shippingTel.addValidators([Validators.required]);
  //     this.paymentForm.controls.shippingTel.updateValueAndValidity();
  //   }

  // }

}
