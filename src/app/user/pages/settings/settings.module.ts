import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data:{pageName:'settings'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // LeftBar_after_loginModule,
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes),
    MatInputModule,
    // HeaderResponsiveModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
