import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio_viewComponent } from './portfolio_view.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
// import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";


const routes: Routes = [
  {
    path: '',
    component: Portfolio_viewComponent,
    data:{sidebar:false, pageName:'profileView'}
  }
]

@NgModule({
    declarations: [Portfolio_viewComponent],
    imports: [
        CommonModule,
        // After_login_header_GlobalModule,
        RouterModule.forChild(routes),
        CarouselModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        // HeaderResponsiveModule
    ]
})
export class Portfolio_viewModule { }
