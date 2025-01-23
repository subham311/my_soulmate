import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload_photoComponent } from './upload_photo.component';
import { RouterModule, Routes } from '@angular/router';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import { ReactiveFormsModule } from '@angular/forms';
// import {FileUploadModule} from 'primeng/fileupload';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'



const routes: Routes = [
  {
    path: '',
    component: Upload_photoComponent,
    data:{pageName:'uploadphoto'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    // LeftBar_after_loginModule,
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes),
    FormsModule,
    // HeaderResponsiveModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    ImageCropperModule,
    MatButtonModule,
    MatDialogModule
    
  ],
  declarations: [Upload_photoComponent]
})
export class Upload_photoModule { }
