import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
   basePath: string = 'http://localhost:8085/ays/';
   //basePath: string = 'http://192.168.43.52:8085/ays/';
   filterMembers:any;
    count=new BehaviorSubject<number>(0);
   cast=this.count.asObservable();

   constructor(private commonService:CommonserviceService,private _http:HttpClient) { }

  getMembers(){
    this.filterMembers=[];
    this._http.get(this.basePath + "team/ESP").subscribe(res1 => {
      this.filterMembers = res1;
      for (let index = 0; index < this.filterMembers.length; index++) {
        this.filterMembers = this.filterMembers[index].user_name;       
      }
      console.log(this.filterMembers)
    });
    return this.filterMembers;
  }

  getCount(newCount){
    this.count.next(newCount);
  }
}
