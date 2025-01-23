import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio_viewComponent } from './portfolio_view.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: Portfolio_viewComponent,
    data:{sidebar:false, pageName:'profileView'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [Portfolio_viewComponent]
})
export class Portfolio_viewModule { }
