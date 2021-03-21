import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import { SelectItem } from 'primeng/primeng';
import { Request } from '../request/request';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RequestDetail } from '../request-detail/request-detail';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  req_name: string;
  filterMembers:any;
  members:string[];
  filterGrps:any;
  cols: any;
  users: string[] = [];
  requestObj: any;
  req: Request = new Request();
  reqD: RequestDetail = new RequestDetail();
  status: SelectItem[];
  styles:any;
  current_user:string;
  sub:any;
  ticketCount:number;
  
  constructor(private route: ActivatedRoute,private service: ServiceComponent, private _http: HttpClient, private router: Router, private commonService: CommonserviceService) { }
  display: boolean = false;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  filterUser(event) {
    this.filterMembers = [];
    for(let i = 0; i < this.users.length; i++) {
        let user = this.users[i];
        if(user.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filterMembers.push(user);
        }
    }
}

  ngOnInit() {
    this.req_name = localStorage.getItem("req");
    this.sub = this.route.params.subscribe(params => {
      this.current_user = params['name'];});
      if(this.current_user==null || this.current_user==undefined){
        this.current_user=sessionStorage.getItem("sesUser");
      }
    this.getRequests();
    this.getMembers();
    this.status = [
      { label: 'New', value: 'N' },
      { label: 'InProgress', value: 'IN' },
      { label: 'Completed', value: 'C' },
      { label: 'Resolved', value: 'R' },
    ];  
    ;
  }

  getRequests() {
    this._http.get(this.commonService.basePath + "requestByGrp/"+sessionStorage.getItem("sesGrp")+"/"+this.current_user).subscribe(res => {
      this.requestObj = res;
      console.log(Object.keys(this.requestObj).length);
      this.commonService.getCount(Object.keys(this.requestObj).length);
    });
  }

  getMembers(){
    this.filterMembers=[];
    this._http.get(this.commonService.basePath + "team/ESP").subscribe(res1 => {
      this.filterMembers = res1;
      for (let index = 0; index < this.filterMembers.length; index++) {
         this.users[index]=this.filterMembers[index].user_name; 
      }
    });
    return this.filterMembers;
  }
  
send(req: any) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.put(`${this.commonService.basePath}` + "updateRequest2/"+req.request_id,req, { headers: myheader }).subscribe(
      data => {
        this.getRequests();
      },
      error => {
        console.log(error);
      }
    );
  }

  
}