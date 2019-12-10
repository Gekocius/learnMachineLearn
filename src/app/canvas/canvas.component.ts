import { Component, OnInit, ElementRef } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  private sketch = function(p) {
    let x = 100;
    let y = 100;
  
    p.setup = function() {
      console.log("Calling setup");
      p.createCanvas(700, 410);
    };
  
    p.draw = function() {
      console.log("Calling draw");
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  };

  private myp5;

  constructor() {
  }

  ngOnInit() {
    this.myp5 = new p5(this.sketch);
  }
  
}
