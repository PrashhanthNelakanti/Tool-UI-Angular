import { Component, OnInit, HostListener } from '@angular/core';
import { Car } from '../../car-service/car';
import { ServiceComponent } from '../../service/service.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonserviceService } from '../../commonservice.service';
import { Register } from '../../register/reg';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  cars: Car[];
  food: any[];
  images: any[];
  display: boolean;
  data: any;
  reg: Register = new Register();
  requestObj: any;
  options: any;


  constructor(private service: ServiceComponent, private _http: HttpClient, private router: Router, private commonService: CommonserviceService) {
    this._http.get(this.commonService.basePath + "requestByGrp/ESP").subscribe(res => {
      this.requestObj = res;
      var labels = Object.keys(this.requestObj);
      var data = Object.values(this.requestObj);
      this.data = {
        labels: labels,
        datasets: [
          {
            label: '',
            data: data,
            backgroundColor: 'rgba(0, 119, 204, 0.3)',
          },
        ],
      }
    }
    );


    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            userCallback: function (label, index, labels) {
              // when the floored value is the same as the value we have a whole number
              if (Math.floor(label) === label) {
                return label;
              }
            },
          }
        }]
      }
    }
  }



  ngOnInit() {

  }

  @HostListener('window:scroll', ['$event'])
  scrollEvnt($event) {
    this.display = false;
    if (window.pageYOffset > 240) {
      this.display = true;
    }
  }

  selectData(event: any) {
    this.router.navigate(['/tickets/'+event.element._model.label], { skipLocationChange: true });
    console.log(event.element._model.label);
  }


}
