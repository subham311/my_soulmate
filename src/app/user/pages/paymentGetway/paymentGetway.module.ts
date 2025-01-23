import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentGetwayComponent } from './paymentGetway.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  {
    path: '',
    component: PaymentGetwayComponent,
    data:{sidebar:false}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule
  ],
  declarations: [PaymentGetwayComponent]
})
export class PaymentGetwayModule { }
