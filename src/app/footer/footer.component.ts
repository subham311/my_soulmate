import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // isHomeRoute: boolean = false;
  // isLoginRoute: boolean = false;

  constructor(private service: DataService, private router: Router , private route: ActivatedRoute) {

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.isHomeRoute = event.url === '/home';
    //   // this.isLoginRoute = event.url === '/user/profile_list';

    //   console.log(this.isHomeRoute, 'kkkkkkkkkkkkkkkk');
      
    // });

   }

  ngOnInit() {
    
  }

  shouldShowFooter(url: string): boolean {
    // Define conditions here based on the current route
    // For example:
    return url !== '/home'; // Show footer for all routes except '/login'
  }

  
  gotoPage(url){
    if(this.service.login()){
      this.router.navigate(['/user/'+url]);
    } else {
      this.router.navigate(['/home/'+url]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
