import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Otp_loginComponent } from './otp_login.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
// import { OnlyNumberDirective } from 'src/app/Directives/only-number.directive';
import { NgOtpInputModule } from 'ng-otp-input';

const router: Routes = [
  {
    path: '',
    component: Otp_loginComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    NgOtpInputModule,
    RouterModule.forChild(router)
  ],
  // declarations: [Otp_loginComponent, OnlyNumberDirective]
  declarations: [Otp_loginComponent]

})
export class Otp_loginModule { }
