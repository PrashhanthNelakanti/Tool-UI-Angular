import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  p1Enable: boolean = true;
  p2Enable: boolean = true;

  p1Stone: boolean;
  p1Paper: boolean;
  p1Scissors: boolean;
  p1Count: number=0;

  p2Stone: boolean;
  p2Paper: boolean;
  p2Scissors: boolean;
  p2Count: number=0;

  constructor() { }

  ngOnInit() {
  }

  getP1Stone() {
    this.p1Stone = true;
    this.processGame();
  }

  getP2Stone() {
    this.p2Stone = true;
    this.processGame();
  }

  getP1Paper() {
    this.p1Paper = true;
    this.processGame();
  }

  getP2Paper() {
    this.p2Paper = true;
    this.processGame();
  }

  getP1Scissor() {
    this.p1Scissors = true;
    this.processGame();
  }

  getP2Scissor() {
    this.p2Scissors = true;
    this.processGame();
  }

  processGame() {
    if (this.p1Paper || this.p1Scissors || this.p1Stone) {
      this.p1Enable = false;
      this.p2Enable = true;
    }
    if (this.p2Paper || this.p2Scissors || this.p2Stone) {
      this.p2Enable = false;
      this.p1Enable = true;
      this.scoreCalculator();
    }
   }

  scoreCalculator() {
    if (this.p1Paper && this.p2Stone) {
      this.p1Count ++;
    }
    if (this.p1Paper && this.p2Paper) {
     // this.p1Count =0;
    }
    if (this.p1Paper && this.p2Scissors) {
      this.p2Count ++;
    }
    if (this.p1Stone && this.p2Stone) {
     // this.p1Count = 0;
    }
    if (this.p1Stone && this.p2Paper) {
      this.p2Count ++;
    }
    if (this.p1Stone && this.p2Scissors) {
      this.p1Count ++;
    }
    if (this.p1Scissors && this.p2Stone) {
      this.p2Count ++;
    }
    if (this.p1Scissors && this.p2Paper) {
      this.p1Count ++;
    }
    if (this.p1Scissors && this.p2Scissors) {
     // this.p2Count = 0;
    }
    this.p1Paper = false; this.p2Paper = false;
    this.p2Scissors = false; this.p2Scissors = false;
    this.p1Stone = false; this.p2Stone = false;
    console.log(this.p1Count)
    console.log(this.p2Count)
  }

}

