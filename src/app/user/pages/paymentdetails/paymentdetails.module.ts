import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentdetailsComponent } from './paymentdetails.component';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";

const routes: Routes = [
  {
    path: '',
    component: PaymentdetailsComponent,
    data:{pageName:'paymentDetails'}
  }
]

@NgModule({
    declarations: [PaymentdetailsComponent],
    imports: [
        CommonModule,
        // LeftBar_after_loginModule,
        // After_login_header_GlobalModule,
        RouterModule.forChild(routes),
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HeaderResponsiveModule
    ]
})
export class PaymentdetailsModule { }
