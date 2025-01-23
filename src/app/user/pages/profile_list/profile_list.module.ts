import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile_listComponent } from './profile_list.component';
import { RouterModule, Routes } from '@angular/router';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDirective } from 'src/app/Directives/scroll.directive';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';


const routes: Routes = [
  {
    path: '',
    component: Profile_listComponent,
    data:{pageName:'profileList'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    // LeftBar_after_loginModule,
    // After_login_header_GlobalModule,
    // HeaderResponsiveModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CarouselModule

  ],
  declarations: [
    Profile_listComponent,
    ScrollDirective
  ]
})
export class Profile_listModule { }
