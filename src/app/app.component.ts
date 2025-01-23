import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { DataService } from './Services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // loaderHome__:boolean;

  isHomeRoute: boolean = false;

  ifreameShoHid = false;
  maxShoHid = true;
  // minShoHid = false;


  constructor(private __router:Router, private __actRoute:ActivatedRoute, private dataSer___:DataService, private spinner: NgxSpinnerService){}


  // ngAfterViewInit(): void {
  //   this.isHomeRoute = true;
  // }

  ngOnInit(): void {

    setTimeout(() => {
      this.isHomeRoute = true;
    }, 1000);

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

    
    // this.spinner.show();

    this.loaderFn_Home();


    
  }

  loaderFn_Home(){
    setTimeout(
      () =>{
        this.spinner.hide()
      }
      , 2000);
  }

  minimize(){
  document.getElementById('chatBot_Id').style.display ="none";
  this.maxShoHid = false;
  }



  maximize(){
  document.getElementById('chatBot_Id').style.display ="block";

  this.maxShoHid = true;
  }
  
  // title = 'horoscope';
}
