import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../Services/data.service';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  data:any
  constructor(private service:DataService, private router: Router){

  } 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    this.data = this.service.login();
    if(this.data){
      this.router.navigate(['/user/profile_list']);
      
    } 
       
    return !this.data;
    // return true

    
    

  }



  

  
}


