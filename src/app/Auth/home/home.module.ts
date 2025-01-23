import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Before_login_header_N_HomeModule } from '../../Before_login_header_N_Home/Before_login_header_N_Home.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
// import { OnlyNumberDirective } from 'src/app/Directives/only-number.directive';
import { NgOtpInputModule } from 'ng-otp-input';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data:{pageName:'home'}
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
    // Before_login_header_N_HomeModule,
    NgOtpInputModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [HomeComponent, OnlyNumberDirective]
  declarations: [HomeComponent]
})
export class HomeModule { }
