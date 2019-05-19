import { Component, OnInit } from '@angular/core';
import { MessageService } from '../car-service/mesgService';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/primeng';
import { CommonserviceService } from '../commonservice.service';
import { Product } from '../enterproducts/products';


@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  value: number = 10;
  level: number[] = [];
  state:string;
  length=0;
  items
  : MenuItem[];
  constructor( private _http: HttpClient,private commonService:CommonserviceService, private r: Router) { }
  interval:any;
  products:any;
  ngOnInit() {
    this.refreshData();
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 1000);
  }
  refreshData(){
    this._http.get(this.commonService.basePath+"getP/1").subscribe(res => {
      this.products = res;
      console.log(this.products);
      if(this.products.status==1){
        this.state='Initial'
        this.length=1;
      }
      if(this.products.status==2){
        this.state='Submitted'
        this.length=2;
      }
      if(this.products.status==3){
        this.state='Activated'
        this.length=3;
      }
      if(this.products.status==4){
        this.state='Scheduled'
        this.length=4;
      }
      if(this.products.status==5){
        this.state='Completed'
        this.length=5;
      }
      if(this.products.status==-1){
        this.state='Cancel'
        this.length=-1;
      } 
      console.log(this.state) 
    });
    this.items = [
      {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
      {label: 'Documentation', icon: 'fa fa-fw fa-book'},
      {label: 'Support', icon: 'fa fa-fw fa-support'},
      {label: 'Social', icon: 'fa fa-fw fa-twitter'}
  ];

    for (let index = 0; index < 5; index++) {
      this.level[index] = index;
    }
  }
}