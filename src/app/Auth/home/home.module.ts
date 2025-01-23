import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
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
import { PlatformModule } from '@angular/cdk/platform';

import { ImageCropperModule } from 'ngx-image-cropper';
import {MatButtonModule} from '@angular/material/button';

import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';


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
    NgOtpInputModule,
    PlatformModule,
    ImageCropperModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [HomeComponent, OnlyNumberDirective]
  declarations: [HomeComponent]
})
export class HomeModule { }
