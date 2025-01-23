import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacypolicyComponent } from './privacypolicy.component';
// import { Before_login_header_N_HomeModule } from '../../Before_login_header_N_Home/Before_login_header_N_Home.module';
import { RouterModule, Routes } from '@angular/router';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";

const routes: Routes = [
  {
    path: '',
    component: PrivacypolicyComponent,
    data:{sidebar:false, pageName:'privacyPolicy'}
  }
]

@NgModule({
    declarations: [PrivacypolicyComponent],
    imports: [
        CommonModule,
        // Before_login_header_N_HomeModule,
        RouterModule.forChild(routes),
        HeaderResponsiveModule
    ]
})
export class PrivacypolicyModule { }
