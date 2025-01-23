import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User_dashboardComponent } from './user_dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    RouterModule.forChild(routes),
    CarouselModule
  ],
  declarations: [User_dashboardComponent]
})
export class User_dashboardModule { }
