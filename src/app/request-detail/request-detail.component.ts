import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';
import { ServiceComponent } from '../service/service.component';
import { Request } from '../request/request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestDetail } from './request-detail';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  msg: string[];
  user_name: string;
  name: string;
  sub:any;
  req: Request = new Request();
  reqAct: RequestDetail = new RequestDetail();
  grp: string[] = ['', 'ESP', 'OM', 'PQ', 'PC'];
  filterGrps: any;
  requestObj: any;
  requestDObj: any;
  id: number;
  cols: any;
  filteredUsers: any[];
  filteredGrps: any[];
  filterMembers: any;
  users: string[] = [];
  showMember: boolean = false;
  resolve: boolean = false;
  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router, private commonService: CommonserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cols = [
      { field: 'Notes', header: 'Notes' },
      { field: 'Assigned To', header: 'Assigned To' },
      { field: 'On', header: 'On' },
    ];
    this.get();
    this.getDetails();
    this.getMembers();
  }

  filterMember(event) {
    this.filteredUsers = [];
    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i];
      console.log(this.users[i])
      if (user.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredUsers.push(user);
      }
    }
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

  test() {
    if (this.reqAct.assignedGrp != undefined) {
      this.showMember = true;
    }
    this.getMembers();
    this.reqAct.assignedTo = '';
  }

  getMembers() {
    this.filterMembers = [];
    this.users = [];
    this._http.get(this.commonService.basePath + "team/" + this.reqAct.assignedGrp).subscribe(res1 => {
      this.filterMembers = res1;
      for (let index = 0; index < this.filterMembers.length; index++) {
        this.users[index] = this.filterMembers[index].user_name;
      }
    });
    return this.filterMembers;
  }

  getDetails() {
    this._http.get(this.commonService.basePath + "RActivityDetail/" + this.id).subscribe(res => {
      this.requestDObj = res;
      this.reqAct.status = this.requestDObj.status;
      this.reqAct.assignedTo = this.requestDObj.assignedTo;
      if(name==null || name==undefined){

      }
      else{
        this.showMember=true;
        this.reqAct.assignedTo=name;
      }
    });
  }

  get() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sub = this.route.params.subscribe(params => {
    this.name = params['name'];});
    this.id = Number(id);
    this._http.get(this.commonService.basePath + "getReqById/" + this.id).subscribe(res => {
      this.requestObj = res;
      this.req.requestedBy = this.requestObj.requestedBy;
      this.req.requested_on = this.requestObj.requested_on;
      this.req.request = this.requestObj.request;
      this.reqAct.assignedGrp=this.requestObj.assignedGrp;
      this.reqAct.assignedTo=this.requestObj.assignedTo;
      console.log(this.requestObj)
      if (this.requestObj
        .isResolved) {
        this.resolve = true;
      }
    });
  }
  send() {
    this.reqAct.status = 'R';
    this.reqAct.requestId = this.id;
    this.reqAct.activityDate = new Date();
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.commonService.basePath}` + "addRActivity", JSON.stringify(this.reqAct), { headers: myheader }).subscribe(
      data => {
        console.log(data);
        this.getDetails();
      },
      error => {
        console.log(error);
      }
    );
  }
  resolved(reqAct: RequestDetail) {
    this.req.request_id = this.id;
    this.resolve = true;
    this.req.isResolved = true;
    this.req.status = 'R';
    this.reqAct.assignedTo = sessionStorage.getItem("sesUser");
    this.reqAct.assignedGrp = sessionStorage.getItem("sesGrp");
    console.log(this.reqAct.assignedGrp);
    this.req.resolvedBy = this.reqAct.assignedTo;
    this.req.resolvedByGrp = this.reqAct.assignedGrp;
    this.send();
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.put(`${this.commonService.basePath}` + "updateRequest2/" + this.id, this.req, { headers: myheader }).subscribe(
      data => {
        this.get();
      },
      error => {
        console.log(error);
      }
    );
  }

}
