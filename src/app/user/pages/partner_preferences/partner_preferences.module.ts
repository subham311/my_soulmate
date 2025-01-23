import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner_preferencesComponent } from './partner_preferences.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';

const routes: Routes = [
  {
    path: '',
    component: Partner_preferencesComponent,
    data:{sidebar:false, pageName:'partnersPref'}
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
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Partner_preferencesComponent]
})
export class Partner_preferencesModule { }
