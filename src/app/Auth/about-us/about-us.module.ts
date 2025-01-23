import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule, Routes } from '@angular/router';
// import { Before_login_header_N_HomeModule } from '../../Before_login_header_N_Home/Before_login_header_N_Home.module';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    // Before_login_header_N_HomeModule,
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
