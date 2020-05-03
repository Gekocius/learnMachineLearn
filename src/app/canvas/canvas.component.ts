import { Component, OnInit, AfterViewInit, Input, AfterViewChecked } from '@angular/core';
import * as p5 from 'p5';
import Population from "../algorithms/genetic-alg/population"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewChecked {
  private isRendered: boolean = false;
  population: Population = new Population(20, 0.1);
  private firstClick: Boolean = true;
  mutationRate : number = 0.7;
  isRunningMessage = "Připraveno";
  constructor() {
  }

  ngAfterViewChecked(): void {
    if (!this.isRendered) {
      let canvasW = document.getElementById("p5sketch").offsetWidth;
      if (canvasW > 0) {
        this.population.setCanvasSize(canvasW, 300);
        new p5(this.population.sketch.bind(this.population), document.getElementById("p5sketch"));
        this.isRendered = true;
      }
    }
  }

  async runAlgorithm() {
    console.log(this.firstClick);
    if(!this.firstClick){
      this.population.reset();
    }
    this.firstClick = false;
    this.population.mutationRate = this.mutationRate;
    this.isRunningMessage = "Algoritmus běží";
    await this.population.run();
    this.isRunningMessage = "Dokončeno!";
  }

  updateMutationRate(event: any){ 
    this.mutationRate = event.target.value;
  }

}
