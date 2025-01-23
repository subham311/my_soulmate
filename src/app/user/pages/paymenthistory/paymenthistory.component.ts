import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { VERSION, ElementRef} from "@angular/core";
// import { jsPDF } from "jspdf";
import { jsPDF } from 'jspdf';
import { DataService } from 'src/app/Services/data.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/message.service';
import { billingAllHistory } from 'src/app/Model/user_dtls';
import html2canvas from "html2canvas";
import { SecrectDataService } from 'src/app/Services/SecrectData.service';

// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment_history',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.css']
})
export class PaymenthistoryComponent implements OnInit {

  @ViewChild("couponPage", { static: true }) couponPage: ElementRef;
  name = "Angular " + VERSION.major;

  memberShipStatus:any;
  localstorageDT:any;
  billingAllHistory:any;
  showSubscriptioMsg : boolean = false;

  public inProgress: boolean = false;

  findBillById:any;
  order_Response:any;

  hideBill: boolean = false;

  onclckDownBtn = true;

  // billingAllHistory:billingAllHistory;
  getLocalSecrectUrl= this.sds.getLocalSecrectData(); 

  constructor(private service:DataService, private router:Router, private msgService: MessageService, private sds:SecrectDataService) { }

  ngOnInit() {

    // this.localstorageDT = {
    //   id:localStorage.getItem("id"),
    //  user_name:localStorage.getItem("​​​user_name")
    //   }

    this.localstorageDT = {
      id:this.getLocalSecrectUrl.data.id,
     user_name:this.getLocalSecrectUrl.data.​​​user_name
      }


    // this.memberShipStatus = {
    //   payStatus:localStorage.getItem("plan_id"),
    //   pay_name:localStorage.getItem("pay_name")
    //   }

    this.memberShipStatus = {
    payStatus:this.getLocalSecrectUrl.data.plan_id,
    pay_name:this.getLocalSecrectUrl.data.pay_name
    }


    this.loadPaymentHistory()
  }

  openPDF(event, item): void {
    
    this.findBillById = this.billingAllHistory.filter((e:any)=>{
      // e.position==1

      if(e.order_id == event){

        return e
      }
       
    });

    this.order_Response = this.findBillById[0];

    

    // this.billingAllHistory.findIndex((element: any, event: any, aray: any) => {
    //   this.billingAllHistory[event]['loaderShow'] = false;
    // });

    this.billingAllHistory.findIndex((element: any, index: any) => {

      this.billingAllHistory[index]['loaderShow'] = true;

      if(element.order_id == event){
        this.billingAllHistory[index]['loaderShow'] = false;
      }
      
    });


    setTimeout(()=>{
    var content = document.getElementById('couponPage') as HTMLElement
    html2canvas(content).then(function (canvas)
    {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    // doc.addImage(img, 15, 20, 180, 120);
    doc.addImage(img, 15, 15, 180, 80);
    doc.save(event+'_soulmate.pdf');
    })
    this.billingAllHistory.findIndex((element: any, index: any) => {
    this.billingAllHistory[index]['loaderShow'] = true;
    });

    }, 2000)

    
  }

  loadPaymentHistory(){

    this.inProgress = true; 

    this.service.global_service(0, '/payment_history', `user_id=${this.localstorageDT.id}`).subscribe((data:any) => {
      this.billingAllHistory = data;

      if(data.msg.length > 0){
        this.inProgress = false; 
        this.showSubscriptioMsg = false;
        this.billingAllHistory = data.msg;
        // this.billingAllHistory[index]['active'] = true;

        for(let i=0; i<this.billingAllHistory.length; i++) {
          this.billingAllHistory[i]['loaderShow'] = true;
        }

        // this.order_Response = this.billingAllHistory[0]
      }

      if(data.msg.length < 1){
        this.inProgress = false; 
        this.showSubscriptioMsg = true;
      }

      
      })
  }


  downloadBill(event){
    this.findBillById = this.billingAllHistory.filter((e:any)=>{
      // e.position==1

      if(e.order_id == event){

        return e
      }
       
    });

    this.order_Response = this.findBillById[0];

    
  }

  // onChangeHour(event:any) {
  // }



}
