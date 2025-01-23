import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

import {MatDividerModule} from '@angular/material/divider';
// import {MatButtonModule} from '@angular/material/button';

import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthGuard } from '../guard/auth.guard';
import {MatChipsModule} from '@angular/material/chips';
// import {MatCardModule} from '@angular/material';
// import { SecrectDataService } from '../Services/SecrectData.service';
import {MatDialogModule} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { LeftBar_after_loginModule } from './leftBar_after_login/leftBar_after_login.module';
import { HeaderResponsiveModule } from './headerResponsive/headerResponsive.module';
import { FooterModule } from './footer/footer.module';



const routes: Routes = [
  {
    path: '',
    component: UserComponent,
      children: [
      // {
      //   path:'home',
      //   loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
      // },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path:'user_dashboard', canActivate:[AuthGuard],
        loadChildren: () => import('./pages/user_dashboard/user_dashboard.module').then((m) => m.User_dashboardModule)
      },
      {
        path:'profile_list', canActivate:[AuthGuard], 
        loadChildren: () => import('./pages/profile_list/profile_list.module').then((m) => m.Profile_listModule)
      },
      {
        path:'user_profile_edit', canActivate:[AuthGuard], 
        loadChildren: () => import('./pages/user_portfolio_edit/user_portfolio_edit.module').then((m) => m.User_portfolio_editModule)
      },
      {
        path:'upload_photo', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/upload_photo/upload_photo.module').then((m) => m.Upload_photoModule)
      },
      {
        path:'hobbies', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/hobbies/hobbies.module').then((m) => m.HobbiesModule)
      },
      {
        path:'partner_preferences', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/partner_preferences/partner_preferences.module').then((m) => m.Partner_preferencesModule)
      },
      {
        path:'id_verification', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/id_verification/id_verification.module').then((m) => m.Id_verificationModule)
      },
      {
        path:'portfolio_view/:id', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/portfolio_view/portfolio_view.module').then((m) => m.Portfolio_viewModule)
      },
      {
        path:'settings', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule)
      },
      {
        path:'paymentGetway', canActivate:[AuthGuard],  
        // path:'paymentGetway',
        loadChildren: () => import('./pages/paymentGetway/paymentGetway.module').then((m) => m.PaymentGetwayModule)
      },
      {
      path:'paymentResponse/:flag/:ordId', canActivate:[AuthGuard],  
      // path:'paymentGetway',
      loadChildren: () => import('./pages/paymentResponse/paymentResponse.module').then((m) => m.PaymentResponseModule)
      },
      
      {
        path:'paymenthistory', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/paymenthistory/paymenthistory.module').then((m) => m.PaymenthistoryModule)
      },
      {
        path:'paymentdetails/:id', canActivate:[AuthGuard],  
        loadChildren: () => import('./pages/paymentdetails/paymentdetails.module').then((m) => m.PaymentdetailsModule)
      },
      {
        path:'aboutus',  
        loadChildren: () => import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule)
      },
      {
        path:'forgetpassword/:email_Id', 
        loadChildren: () => import('./pages/change-password/change-password.module').then((m)=> m.ChangePasswordModule)
      },

      // {
      //   path:'customerSupport',  
      //   loadChildren: () => import('./pages/customersupport/customersupport.module').then((m) => m.CustomersupportModule)
      // },
      // {
      //   path:'refundpolicy',  
      //   loadChildren: () => import('./pages/refundpolicy/refundpolicy.module').then((m) => m.RefundpolicyModule)
      // },
      {
        path:'terms-condition',  
        loadChildren: () => import('./pages/termscondition/termscondition.module').then((m) => m.TermsconditionModule)
      },
      {
        path:'privacypolicy',  
        loadChildren: () => import('./pages/privacypolicy/privacypolicy.module').then((m) => m.PrivacypolicyModule)
      },
      {
        path:'wishlist', canActivate:[AuthGuard], 
        loadChildren: () => import('./pages/wishlist/wishlist.module').then((m) => m.WishlistModule)
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    HeaderResponsiveModule,
    LeftBar_after_loginModule,
    FooterModule,
    RouterModule.forChild(routes)
  ],

  // providers: [
  //   SecrectDataService
  // ],
  
  declarations: [UserComponent],

})
export class UserModule { } 
