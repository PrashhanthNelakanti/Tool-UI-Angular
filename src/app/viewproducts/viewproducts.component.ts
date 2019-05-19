import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../car-service/car';
import { SelectItem } from 'primeng/primeng';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../enterproducts/products';
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})

export class ViewproductsComponent implements OnInit {
  products: any;
  prod: Product = new Product();
  types: SelectItem[];
  selectedType: string;
  amt:number;
  amts:number[]=[];
  prodArrays:Product[]=[];
  
  constructor(private fb: FormBuilder, private _http: HttpClient, private r: Router,private commonService:CommonserviceService) {
    this.types = [];
    this.types.push({ title: 'Paypal', value: 'PayPal', icon: 'fa fa-fw fa-cc-paypal' });
    this.types.push({ title: 'Visa', value: 'Visa', icon: 'fa fa-fw fa-cc-visa' });
    this.types.push({ title: 'MasterCard', value: 'MasterCard', icon: 'fa fa-fw fa-cc-mastercard' });
  }

  display: boolean = false;
  ngOnInit() {
    this._http.get(this.commonService.basePath+"getP").subscribe(res => {
      this.products = res;
      for(let i=0;i<this.products.length;i++){
        this.products[i].units=0;
      }
    });
  }
  

  do(v:number) {
    for(let i=0;i<this.products.length;i++){ 
      if(this.products[i].units>0){
         this.amt= this.products[i].units*this.products[i].price;
         this.amts.push();      
      }  
      alert(v)
    }  
    this.display = true;
  }

  

  updateProd(event: any) {
    this.prod.fileUrl = event.xhr.response;
    this.prod.units = 10;
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.commonService.basePath}` + "updateP/" + this.prod.pid, JSON.stringify(this.prod), { headers: myheader }).subscribe(
      data => {
        console.log('ok');
      },
      error => {
        console.log(error);
      }
    );
  }

  collectData(p:Product){
    this.prodArrays.push(p);

  }

}




