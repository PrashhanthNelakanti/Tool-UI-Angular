import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  message = false;
  msg = false;
  name:string=sessionStorage.getItem("sesUser");

  constructor(private service: ServiceComponent,private router: Router) { }

  ngOnInit() {
    console.log(name)
    this.service.currentMessage.subscribe(message => this.message = message);
    this.service.isAdminNow.subscribe(msg => this.msg = msg);
    /* this.currentStyles = {
     // 
      'color': this.message ? 'white' : 'white',
      'padding': this.message ? '14px 25px' : '14px 25px',
      'text-align': this.message ? 'center' : 'center',
      'text-decoration': this.message ? 'none' : 'none',
      'display': this.message ? 'inline-block' : 'inline-block'
    }; */
  }

  logOut(){
    this.service.changeMessage(false);
    this.service.changeAdminState(false);
    this.router.navigate(['/login']);
  }
  

search(){

}
}
