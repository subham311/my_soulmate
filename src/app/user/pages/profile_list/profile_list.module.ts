import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile_listComponent } from './profile_list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDirective } from 'src/app/Directives/scroll.directive';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: Profile_listComponent,
    data:{pageName:'profileList'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule

  ],
  declarations: [
    Profile_listComponent,
    ScrollDirective
  ]
})
export class Profile_listModule { }
