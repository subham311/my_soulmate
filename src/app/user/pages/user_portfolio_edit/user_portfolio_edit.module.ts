import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User_portfolio_editComponent } from './user_portfolio_edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';
import { MultiSelectModule } from 'primeng/multiselect';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatChipsModule,MatChipInputEvent} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgOtpInputModule } from 'ng-otp-input';







const routes: Routes = [
  {
    path: '',
    component: User_portfolio_editComponent,
    data:{sidebar:false, pageName:'editeprofile'}
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
    // HeaderResponsiveModule,
    MatCheckboxModule,
    // After_login_header_GlobalModule,
    MultiSelectModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatChipsModule,
    MatIconModule,
    NgOtpInputModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [User_portfolio_editComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

})
export class User_portfolio_editModule { }
