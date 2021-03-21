import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../../commonservice.service';
import { ServiceComponent } from '../../service/service.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router, private commonService: CommonserviceService, private route: ActivatedRoute) { }
   polling:any;
   polling1:any;
   time:any;
   cols:any;
  ngOnInit() {
    this.getParties();
    this.refreshData();
    this.getTime();
  }

  getParties() {
    this._http.get(this.commonService.basePath + "polling/party").subscribe(res1 => {
      this.polling=res1;
    });  
  }

  getTime() {
    this._http.get(this.commonService.basePath + "polling/getTime").subscribe(res1 => {
      console.log(res1);
      this.time=res1;
    });  
  }

  vote(poll:any){
    this._http.get(this.commonService.basePath + "polling/vote/"+poll.id).subscribe(res1 => {
      this.getParties();
    });  
  }

  refreshData(){
    this.polling1 =
      setInterval(() => {
        this.getParties();
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 30000);  
  }

}
