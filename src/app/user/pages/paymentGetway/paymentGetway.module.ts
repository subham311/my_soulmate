import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGetwayComponent } from './paymentGetway.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";

const routes: Routes = [
  {
    path: '',
    component: PaymentGetwayComponent,
    data:{sidebar:false}
  }
]

@NgModule({
    declarations: [PaymentGetwayComponent],
    imports: [
        CommonModule,
        LeftBar_after_loginModule,
        // After_login_header_GlobalModule,
        RouterModule.forChild(routes),
        CarouselModule,
        // HeaderResponsiveModule
    ]
})
export class PaymentGetwayModule { }
