import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacypolicyComponent } from './privacypolicy.component';
// import { Before_login_header_N_HomeModule } from '../../Before_login_header_N_Home/Before_login_header_N_Home.module';
import { RouterModule, Routes } from '@angular/router';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';

const routes: Routes = [
  {
    path: '',
    component: PrivacypolicyComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    // Before_login_header_N_HomeModule,
    // After_login_header_GlobalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivacypolicyComponent]
})
export class PrivacypolicyModule { }
