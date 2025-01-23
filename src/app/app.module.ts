import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppInterceptorInterceptor } from './Interceptors/app-interceptor.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuard } from './guard/auth.guard';
import { SecrectDataService } from './Services/SecrectData.service';


// import {MatChipsModule} from '@angular/material/chips';
// import { ScrollDirective } from './Directives/scroll.directive';
// import {FileUploadModule} from 'primeng/fileupload';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import {MatDialogModule} from '@angular/material/dialog'

// import { FooterComponent } from './footer/footer.component';
import { SigninGuard } from './guard/signin.guard';



//I keep the new line
@NgModule({
  declarations: [	
    AppComponent,
      DialogBodyComponent,
      // FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    // MatChipsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
    
  ],
  providers: [
    SecrectDataService,
    SigninGuard,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptorInterceptor, multi: true },
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
