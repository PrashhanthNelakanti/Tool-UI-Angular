import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs';
import { CommonserviceService } from '../commonservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private commonService:CommonserviceService,private _http:HttpClient) { }

  serviceCenter: SelectItem[];
  servedArea: string;
  private messageSource = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();
  isAdminNow = this.isAdmin.asObservable();

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeAdminState(msg:boolean){
    this.isAdmin.next(msg);
  }
  
  ngOnInit() {
    this.serviceCenter = [];
    this.serviceCenter.push({ label: 'Select Served Area', value: '' });
    this.serviceCenter.push({ label: 'Kukatpally', value: 'kukatpally' });
    this.serviceCenter.push({ label: 'Nizampet', value: 'nizampet' });
    this.serviceCenter.push({ label: 'Miyapur', value: 'miyapur' });
    this.serviceCenter.push({ label: 'Madinaguda', value: 'madinaguda' });
  }

  getServerdArea(event: any) {
    this.servedArea = event.value;
    this.servedArea = this.servedArea.toUpperCase();
  }

  


}
