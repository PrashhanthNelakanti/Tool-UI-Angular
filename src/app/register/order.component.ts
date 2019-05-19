import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from '../car-service/msg';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Order } from './order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Register } from './reg';
import { CommonserviceService } from '../commonservice.service';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    userform: FormGroup;

    //url: String = 'http://localhost:8082/pms/';
    reg:Register= new Register();
    submitted: boolean;
    bool: any;
    genders: SelectItem[]
    msgs: Message[] = [];

    description: string;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    //private basePath: String = 'http://192.168.0.13:8082/pms';

    constructor(private fb: FormBuilder, private _http: HttpClient, private r: Router,private commonService:CommonserviceService) { }

    ngOnInit() {
        this.userform = this.fb.group({
            'firstname': new FormControl('', Validators.required),
            'username': new FormControl('', Validators.required),
            'lastname': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            'description': new FormControl(''),
            'gender': new FormControl('', Validators.required)
        });

        this.genders = [];
        this.genders.push({ label: 'Select Gender', value: '' });
        this.genders.push({ label: 'Male', value: 'Male' });
        this.genders.push({ label: 'Female', value: 'Female' });
    }

    onSubmit() {
       
    }


    checkUser() {
        this.msgs = [];
        this.getData().subscribe((data: Order) => {
            this.bool = data.data; console.log(data.data);
            if (this.bool) {
                this.msgs.push({ severity: 'info', summary: 'User Name ' + this.userform.value.userid + ' already Exits', detail: 'Please try another one' });
                document.getElementById("userId").focus();
            }
        });
    }


    getData() {
        return this._http.get(`${this.commonService.basePath}` + "order/" + this.reg.user_name);
    }

    mileStone() {
        this.r.navigateByUrl("/milestone");
    }

    postData(data: Register) {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json')
        console.log(JSON.stringify(this.reg));
        return this._http.post(`${this.commonService.basePath}` + "addUser",JSON.stringify(this.reg),{headers:myheader}).subscribe(
            data => {
              console.log('ok');
            },
            error => {
              console.log(error);
            }
        );
    }
}


