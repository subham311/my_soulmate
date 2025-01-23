import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'user', 
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
},

{
  path:'home',
  loadChildren:()=> import('./Auth/Auth.module').then((m) => m.AuthModule)
},
{ path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
