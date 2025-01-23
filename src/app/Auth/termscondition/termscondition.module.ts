import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsconditionComponent } from './termscondition.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TermsconditionComponent,
  }
]

@NgModule({
    declarations: [TermsconditionComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class TermsconditionModule { }
