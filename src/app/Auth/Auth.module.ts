import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './Auth.component';
import { RouterModule, Routes } from '@angular/router';
// import { CommonFooterModule } from './Common-footer/Common-footer.module';
import { Before_login_header_N_HomeModule } from "./Before_login_header_N_Home/Before_login_header_N_Home.module";
import { SigninGuard } from '../guard/signin.guard';
import { FooterModule } from './footer/footer.module';
// import { CommonFooterModule } from '../Common-footer/Common-footer.module';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent, canActivate:[SigninGuard],
    children:[
      {
        path:'',
        loadChildren:() => import('./home/home.module').then(home => home.HomeModule)
      },
       {
        path:'otp-login',
        loadChildren:()=> import('./otp_login/otp_login.module').then(otpLogin => otpLogin.Otp_loginModule)
       },
       {
        path:'registration',
        loadChildren: () => import('./registration/registration.module').then((m) => m.RegistrationModule)
       },
       {
        path:'aboutus',
        loadChildren:()=> import('./about-us/about-us.module').then(aboutus => aboutus.AboutUsModule)
       },
       {
        path:'terms-condition',
        loadChildren:()=> import('./termscondition/termscondition.module').then(termscondition => termscondition.TermsconditionModule)
       },
       {
        path:'privacypolicy',
        loadChildren:()=> import('./privacypolicy/privacypolicy.module').then(privacypolicy => privacypolicy.PrivacypolicyModule)
       }    ]
  }
]

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FooterModule,
        RouterModule.forChild(routes),
        Before_login_header_N_HomeModule
    ]
})
export class AuthModule { }
