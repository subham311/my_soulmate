import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatTabsModule } from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';



// import { OnlyNumberDirective } from 'src/app/Directives/only-number.directive';



const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatStepperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
