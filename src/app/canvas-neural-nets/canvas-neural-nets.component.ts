import { Component, AfterViewInit } from '@angular/core';
import {create, all} from 'mathjs';
import Network from '../algorithms/neural-nets/network'
import * as p5 from 'p5';

const math = create(all, {});
@Component({
  selector: 'app-canvas-neural-nets',
  templateUrl: './canvas-neural-nets.component.html',
  styleUrls: ['./canvas-neural-nets.component.scss']
})
export class CanvasNeuralNetsComponent implements AfterViewInit {
  network : Network;
  networkStateMessage: string = "Nenaučená";
  x1: number = 0;
  x2: number = 0;
  prediction: number;
  constructor() {
    this.network = new Network();
  }

  ngAfterViewInit(): void {
    let canvasW = document.getElementById("p5sketch").offsetWidth;
    this.network.canvasW = canvasW;
    this.network.canvasH = 400;
    new p5(this.network.sketch.bind(this.network), document.getElementById("p5sketch"));
  }

  updateX1(event: any){
    this.x1 = event.target.value;
  }

  updateX2(event: any){
    this.x2 = event.target.value;
  }

  async trainNetwork(): Promise<void>{
    let data = [
      [0,0,0],
      [0,1,0],
      [1,0,0],
      [1,1,1]
    ];
    this.networkStateMessage = "Učení probíhá";
    await this.network.train(data, 15000);
    this.networkStateMessage = "Naučena"
  }

  predict(): void{
    this.prediction = this.network.feedforward(this.x1, this.x2);
  }
}
