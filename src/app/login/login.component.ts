import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Register } from '../register/reg';
import { ServiceComponent } from '../service/service.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { state, trigger, transition, animate, style } from '@angular/animations';
import { CommonserviceService } from '../commonservice.service';
import { Messages, Message } from 'primeng/primeng';
import { Session } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 0.5,
        backgroundColor: 'blue',
        transform:'translateY(0)'
      })),
      state('closed', style({
        height: '0.5px',
        opacity: 0.5,
        backgroundColor: 'green',
        transform:'translateY(100px)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),

    
  ],
})
export class LoginComponent implements OnInit {
  display: boolean = false;
  reg: Register = new Register();
  message: boolean = true;
  msg: boolean = true;
  msgs: Message []=[];
  pwd: boolean = false;
  isOpen = true;
  obj:any;
  @Output() checkAdmin = new EventEmitter<boolean>();

  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router,private commonService:CommonserviceService) { }

  ngOnInit() {
    this.service.currentMessage.subscribe(message => this.message = message);
    this.service.isAdminNow.subscribe(msg => this.msg = msg);
  }

  login() {
    this.isOpen = !this.isOpen;
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.commonService.basePath}` + "auth", JSON.stringify(this.reg), { headers: myheader }).subscribe(
      data => {   
        this.msgs=[];
        console.log(data)
        if (data > 0) {
          sessionStorage.setItem("sesUser",this.reg.user_name);  
          this.getUserDetails();      
          this.service.changeMessage(true);
          localStorage.setItem("user",this.reg.user_name);
          this.router.navigate(['/req']);
          if(data==2){
            this.service.changeAdminState(true);      
            this.router.navigate(['/tickets/'+sessionStorage.getItem("sesUser")]);
          }
         
         
        }
        if(data==-1){
          this.msgs.push({severity:'error', summary:'', detail:'Account locked'});
        }
        else{
          this.msgs.push({severity:'error', summary:'Info Message', detail:'User Name or Password Incorrect'});
        }
       
      },
      error => {
        console.log(error);
      }
    );

  }

  showPwd() {
    this.pwd = !this.pwd;
  }

  getUserDetails(){

    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    this._http.get(this.commonService.basePath+"user/"+this.reg.user_name).subscribe(res => {
      this.obj=res;
      sessionStorage.setItem("sesGrp",this.obj.team);        
    });
}
}
