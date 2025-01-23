import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule, Routes } from '@angular/router';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    data:{sidebar:false, pageName:'about'}
  }
]

@NgModule({
    declarations: [AboutUsComponent],
    imports: [
        CommonModule,
        // After_login_header_GlobalModule,
        RouterModule.forChild(routes),
        HeaderResponsiveModule
    ]
})
export class AboutUsModule { }
