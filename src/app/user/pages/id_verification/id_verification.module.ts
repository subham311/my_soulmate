import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Id_verificationComponent } from './id_verification.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgOtpInputModule } from 'ng-otp-input';
// import { OnlyNumberDirective } from 'src/app/Directives/only-number.directive';


const routes: Routes = [
  {
    path: '',
    component: Id_verificationComponent,
    data:{pageName:'idVerification'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    LeftBar_after_loginModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule ,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    NgOtpInputModule
  ],
  declarations: [Id_verificationComponent]
})
export class Id_verificationModule { }
