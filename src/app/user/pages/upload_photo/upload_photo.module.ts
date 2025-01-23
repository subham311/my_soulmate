import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload_photoComponent } from './upload_photo.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'
// import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';


// import {
//   MatDialog,
//   MatDialogRef,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogTitle,
//   MatDialogContent,
// } from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';



const routes: Routes = [
  {
    path: '',
    component: Upload_photoComponent,
    data:{pageName:'uploadphoto'}
  }
]

@NgModule({
  // entryComponents:[DialogBodyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
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
