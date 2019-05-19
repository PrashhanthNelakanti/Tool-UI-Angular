import { Component, OnInit } from '@angular/core';
import { Register } from '../register/reg';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceComponent } from '../service/service.component';
import { Message } from '../car-service/msg';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reg: Register = new Register();
  msgs: Message []=[];
  requestObj:any;
 
  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router,private commonService:CommonserviceService) { }

  ngOnInit() {
    
  }

  unlock() {
   // this.unlock2();
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.commonService.basePath}` + "unlockUser", JSON.stringify(this.reg), { headers: myheader }).subscribe(
      data => { 
        if(data){
          this.msgs.push({severity:'info', summary:'', detail:'Account Unlocked for '+this.reg.user_name});
        }  
        else{
          this.msgs.push({severity:'error', summary:'', detail:'Account is unable to  Unlock because this account might be already unlocked !'});
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserDetails(){
    console.log(this.reg);
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    this._http.get(this.commonService.basePath+"user/"+this.reg.user_name).subscribe(res => {
      this.requestObj = res;
      this.reg.user_name=this.requestObj.userName;
      this.reg.password=this.requestObj.password;
      sessionStorage.setItem("sesGrp",this.reg.team);        
      console.log(this.requestObj);
    });

  }

}
