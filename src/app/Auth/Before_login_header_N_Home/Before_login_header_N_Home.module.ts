import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Before_login_header_N_HomeComponent } from './Before_login_header_N_Home.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'header_BeforeLogin',
    component: Before_login_header_N_HomeComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    ImageCropperModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  // declarations: [Before_login_header_N_HomeComponent]
  declarations: [Before_login_header_N_HomeComponent],
  exports:[Before_login_header_N_HomeComponent]
})
export class Before_login_header_N_HomeModule { }
