import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { RouterModule, Routes } from '@angular/router';
// import { LeftBar_after_loginModule } from '../../leftBar_after_login/leftBar_after_login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { After_login_header_GlobalModule } from '../../after_login_header_Global/after_login_header_Global.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { HeaderResponsiveModule } from "../../headerResponsive/headerResponsive.module";
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  {
    path: '',
    component: WishlistComponent,
    data:{pageName:'wishlist'}
  }
]
@NgModule({
    declarations: [WishlistComponent],
    imports: [
        CommonModule,
        // After_login_header_GlobalModule,
        RouterModule,
        // LeftBar_after_loginModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        // HeaderResponsiveModule,
        CarouselModule
    ]
})
export class WishlistModule { }
