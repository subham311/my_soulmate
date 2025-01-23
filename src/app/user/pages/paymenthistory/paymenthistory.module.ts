import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Payment_historyComponent } from './paymenthistory.component';
import { PaymenthistoryComponent } from './paymenthistory.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';


const routes: Routes = [
  {
    path: '',
    component: PaymenthistoryComponent,
    data:{pageName:'paymentHistory'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    LeftBar_after_loginModule,
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    // HeaderResponsiveModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  declarations: [PaymenthistoryComponent]
})
export class PaymenthistoryModule { }
