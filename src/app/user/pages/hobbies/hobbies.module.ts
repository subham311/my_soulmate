import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbiesComponent } from './hobbies.component';
import { RouterModule, Routes } from '@angular/router';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
// import { HeaderResponsiveModule } from '../../headerResponsive/headerResponsive.module';

const routes: Routes = [
  {
    path: '',
    component: HobbiesComponent,
    data:{pageName:'hobbi'}
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HobbiesComponent]
})
export class HobbiesModule { }
