import { Component, OnInit } from '@angular/core';
import { Request } from './request';

import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import { ServiceComponent } from '../service/service.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  msg: string[];
  user_name: string;
  req: Request = new Request();
  requestObj:any;
  grp: string[] = ['', 'ESP', 'OM', 'PQ', 'PC'];
  filteredGrps: any[];
  cols: any[];
  filterGrps: any;
  assignedGrp: any;

  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router, private commonService: CommonserviceService) { }
  
  ngOnInit() {
    this.user_name = localStorage.getItem("user");
    this.get();
    this.cols = [
      { field: 'State', header: 'State' },
      { field: 'Request No.', header: 'Request No.' },
      { field: 'Requested By', header: 'Requested By' },
      { field: 'Request', header: 'Request' },
      { field: 'Requested On', header: 'Requested On' }
  ];
  }

  send() {
    this.req.requestedBy = this.user_name;
    this.req.requested_on = new Date();
    this.req.isResolved=false;
    this.req.status='intial';
    this.req.resolvedBy='new';
    this.req.resolvedByGrp='new';
    
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.commonService.basePath}` + "addRequest", JSON.stringify(this.req), { headers: myheader }).subscribe(
      data => {
        console.log(data)
        this.get();
      },
      error => {
        console.log(error);
      }
    );
  }
  
  get(){
    this._http.get(this.commonService.basePath+"getReqByName/"+this.user_name).subscribe(res => {
      this.requestObj = res;
      console.log(this.requestObj);
    });
  }

  reopen(req:Request){
      req.status="N";
      req.isResolved=false;
      const myheader = new HttpHeaders().set('Content-Type', 'application/json')
      return this._http.put(`${this.commonService.basePath}` + "updateRequest2/"+req.request_id,req, { headers: myheader }).subscribe(
        data => {
          this.get();
        },
        error => {
          console.log(error);
        }
      );
    }

    filterGrp(event) {
      this.filterGrps = [];
      for (let i = 0; i < this.grp.length; i++) {
        let grp = this.grp[i];
        if (grp.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
          this.filterGrps.push(grp);
        }
      }
    }

    
  }
