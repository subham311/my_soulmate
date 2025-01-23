import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User_dashboardComponent } from './user_dashboard.component';
import { RouterModule, Routes } from '@angular/router';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';

const routes: Routes = [
  {
    path: '',
    component: User_dashboardComponent,
    data:{pageName:'dashboard'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    // LeftBar_after_loginModule,
    // After_login_header_GlobalModule,
    // HeaderResponsiveModule,
    RouterModule.forChild(routes),
    CarouselModule
  ],
  declarations: [User_dashboardComponent]
})
export class User_dashboardModule { }
