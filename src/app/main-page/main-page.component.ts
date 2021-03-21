import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  message = false;
  msg = false;
  name: string = sessionStorage.getItem("sesUser");
  count: number;
  refresh:any;
  constructor(private commonService: CommonserviceService, private service: ServiceComponent, private router: Router, private _http: HttpClient) { }

  ngOnInit() {
    console.log(name)
    this.service.currentMessage.subscribe(message => this.message = message);
    this.service.isAdminNow.subscribe(msg => this.msg = msg);
    this.refreshData();
    /* this.currentStyles = {
     // 
      'color': this.message ? 'white' : 'white',
      'padding': this.message ? '14px 25px' : '14px 25px',
      'text-align': this.message ? 'center' : 'center',
      'text-decoration': this.message ? 'none' : 'none',
      'display': this.message ? 'inline-block' : 'inline-block'
    }; */
  }

  logOut() {
    this.service.changeMessage(false);
    this.service.changeAdminState(false);
    this.router.navigate(['/login']);
  }


  getTicketsCount() {
    this._http.get(this.commonService.basePath+"reqCountByGrpnUser/"+sessionStorage.getItem("sesGrp")+"/"+sessionStorage.getItem("sesUser")).subscribe(res1 => {
      this.commonService.cast.subscribe(count => {
        this.count = Number(res1) - count;
      });
    });
  }

  refreshData(){
    this.refresh =
      setInterval(() => {
        this.getTicketsCount();
      }, 30000);  
  }
}
