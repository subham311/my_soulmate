import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private __router:Router, private __actRoute:ActivatedRoute, private dataSer___:DataService){}

  ngOnInit(): void {
    this.__router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      // console.log(this.__actRoute.children[0].firstChild?.data)
      this.__actRoute.children[0].firstChild?.children[0].firstChild?.data.subscribe((res:any) =>{
        // console.log(res.page, 'lllllllllll');
        this.dataSer___.sidebar_Check.next(res?.sidebar);
        this.dataSer___.pageNameCheck.next(res?.pageName)
        
      })
    })


    
  }

  title = 'horoscope';
}
