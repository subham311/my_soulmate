import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBar_after_loginComponent } from './leftBar_after_login.component';
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
    path: 'left_profilebox',
    component: LeftBar_after_loginComponent,
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
    ImageCropperModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeftBar_after_loginComponent],
  exports:[LeftBar_after_loginComponent]
})
export class LeftBar_after_loginModule { }
