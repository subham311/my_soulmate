import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'footer_home_Global',
    component: FooterComponent,
  }
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterComponent],
  exports:[FooterComponent]
})
export class FooterModule { }
