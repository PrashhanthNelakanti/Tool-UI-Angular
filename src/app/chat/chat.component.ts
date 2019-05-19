import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msg: string = '';
  // msgs: Message[] = [];
  msgs: string[] = [];
  rmsgs: string[] = [];
  n: number = 0;
  color: string;
  echo = true;
  display=false;
  title:string;
  show=false;

  y: number[] = [];


  constructor(private _http: HttpClient, private commonS: CommonserviceService, private r: Router) { }

  ngOnInit() {
  }

  sendMsg() {
    /*  if (this.msg != null && this.msg != '') {
       const myheader = new HttpHeaders().set('Content-Type', 'application/json');
       let params= new HttpParams().set('msg',this.msg);
       
       this._http.get(this.url+"toAI/",{params:params}).subscribe(res => {
        
         console.log(res);
       });
   } */
    this.msgs.push(this.msg);
    if (this.msg == "Hello") {
      this.rmsgs.push("hi");
    }
    if (this.msg.includes("Greet for New Year")) {
      this.display=true;
      this.show=false;
      this.title="Its too early for that";
    }
    if (this.msg.includes("Greet my team ESP")) {
      this.title="Hey ESP Happy X-mas";
      this.display=true;
      this.show=true;
    }
    if (this.msg == "stop echo") {
      this.show=false;
      this.echo = false;
    }
    if (this.msg == "clear") {
      //this.msgs=null;
      this.y.length = 0;
    }
    if (this.msg.includes("create buttons")) {
      if (this.msg.includes("red")) {
        this.color = "red";
      }
      if (this.msg.includes("green")) {
        this.color = "green";
      }
      if (this.msg.includes("yellow")) {
        this.color = "yellow";
      }
      let numb = this.msg.replace(/^\D+/g, '');
      let count = parseInt(numb);
      this.y.length = 0;
      for (let index = 0; index < count; index++) {
        this.y[index] = index;
      }
      console.log(count);

    }
    this.msg = null;
  }

}
