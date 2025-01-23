import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
  }

  gotoPage(url){
    
    if(this.service.login()){
      this.router.navigate(['/user/'+url]);
    } else {
      this.router.navigate(['/home/'+url]);
    }
  }

}
