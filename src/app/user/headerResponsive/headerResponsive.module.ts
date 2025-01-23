import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderResponsiveComponent } from './headerResponsive.component';

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
    path: 'header_responsive',
    component: HeaderResponsiveComponent,
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
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderResponsiveComponent],
  exports:[HeaderResponsiveComponent]
})
export class HeaderResponsiveModule { }
