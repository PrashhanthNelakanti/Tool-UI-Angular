import { Component, OnInit } from '@angular/core';
import { Product } from './products';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-enterproducts',
  templateUrl: './enterproducts.component.html',
  styleUrls: ['./enterproducts.component.css']
})
export class EnterproductsComponent implements OnInit {

  prod:Product= new Product();
  
  //url: String = 'http://localhost:8082/pms/';

  constructor( private _http: HttpClient, private r: Router,private commonService:CommonserviceService) { }
   uri:string=this.commonService.basePath;
  ngOnInit() {
  }

  submit(event:any){
    console.log(event)
  }

  postData(event:any) {
    this.prod.fileUrl=event.xhr.response;
    this.prod.units=10;
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.commonService.basePath}` + "postP",JSON.stringify(this.prod),{headers:myheader}).subscribe(
        data => {
          console.log('ok');
        },
        error => {
          console.log(error);
        }
    );
}

}
