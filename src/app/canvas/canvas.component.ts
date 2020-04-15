import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as p5 from 'p5';
import Population from "../algorhitms/genetic-alg/population"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
  population: Population = new Population(20, 0.1);
  private firstClick: Boolean = true;
  mutationRate : number = 0.7;
  isRunningMessage = "Připraveno";
  constructor() {
  }

  ngAfterViewInit(): void {
    let canvasW = document.getElementById("p5sketch").offsetWidth;
    this.population.setCanvasSize(canvasW, 300);
    console.log(canvasW);
    new p5(this.population.sketch.bind(this.population), document.getElementById("p5sketch"));
  }

  async runAlgorithm() {
    if(!this.firstClick){
      this.population.reset();
      this.firstClick = false;
    }
    this.population.mutationRate = this.mutationRate;
    this.isRunningMessage = "Algoritmus běží";
    await this.population.run();
    this.isRunningMessage = "Dokončeno!";
  }

  updateMutationRate(event: any){ 
    this.mutationRate = event.target.value;
  }

}
