import { Component, OnInit, ViewChild } from '@angular/core';
import { VERSION, ElementRef} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

@Component({
  selector: 'app-paymentResponse',
  templateUrl: './paymentResponse.component.html',
  styleUrls: ['./paymentResponse.component.css']
})
export class PaymentResponseComponent implements OnInit {

@ViewChild("couponPage", { static: true }) couponPage: ElementRef;
name = "Angular " + VERSION.major;

accTypeAftPay:any;

urlResponse:any;
urlResponse_OrderId:any;
order_Response:any;
order_Response__:any;

paymentStatusSuc = false;
paymentStatusFauil = false;

subscriptionResponse:any;

  constructor(private service:DataService, private router:Router, private route: ActivatedRoute, private msgService: MessageService, protected _sanitizer: DomSanitizer, private sds:SecrectDataService) { }

  ngOnInit() {

    

    this.urlResponse = this.route.snapshot.paramMap.get('flag');
    this.urlResponse_OrderId = this.route.snapshot.paramMap.get('ordId');

if(this.urlResponse > 0){
  this.service.global_service(1, '/get_pay_response', {order_id: this.urlResponse_OrderId}).subscribe(data=>{
    this.order_Response = data;

    this.paymentStatusSuc = false;
    this.paymentStatusFauil = false;


    if(this.order_Response.suc > 0){
      this.paymentStatusSuc = true;
      this.paymentStatusFauil = false;
      this.order_Response = this.order_Response.msg[0];
      // this.msgService.successMsg('SS');

      // localStorage.removeItem("plan_id");
      // localStorage.removeItem("pay_name");

      // localStorage.setItem("plan_id", this.order_Response.pack_id);
      // localStorage.setItem("pay_name", this.order_Response.pack_name);

      this.sds.setLocalSecrectData({plan_id: this.order_Response.pack_id})
      this.sds.setLocalSecrectData({pay_name: this.order_Response.pack_name})

      this.accTypeAftPay = this.order_Response.pack_name;

      this.subscriptionResponse = {
        plan_id: this.order_Response.pack_id,
        pay_name: this.order_Response.pack_name
      }

      
      
      // this.service.subscriptionRespon.next(this.subscriptionResponse);

    }else{
      this.order_Response__ = this.order_Response.msg[0];
      // this.msgService.errorMsg('ES');

    }

    });
} else {

  this.paymentStatusSuc = false;
  this.paymentStatusFauil = true;

}

    

    // const orderIdAray = this.orderIdMain.split("&");

  }

  openPDF(event): void {
    
    // this.findBillById = this.billingAllHistory.filter((e:any)=>{

    //   if(e.order_id == event){

    //     return e
    //   }
       
    // });

    // this.order_Response = this.findBillById[0];

    // setTimeout(()=>{

  var content = document.getElementById('couponPage') as HTMLElement
  html2canvas(content).then(function (canvas)
    {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      // doc.addImage(img, 15, 20, 180, 120);
      doc.addImage(img, 15, 15, 180, 80);
      doc.save(event+'_soulmate.pdf');
  })
    

    // }, 2000)

    
  }

}
