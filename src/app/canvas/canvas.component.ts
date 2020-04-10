import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as p5 from 'p5';
import Population from "../algorhitms/genetic-alg/population"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  @Input() sketch
  constructor() {
  }

  ngAfterViewInit(): void {
    let canvasW = document.getElementById("p5sketch").offsetWidth;
    let population = new Population(20, 0.1);
    population.setCanvasSize(canvasW, 300);
    console.log(population);
    new p5(population.sketch.bind(population), document.getElementById("p5sketch"));
    population.run();
  }
}
