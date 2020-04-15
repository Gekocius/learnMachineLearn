import { Component, AfterViewInit } from '@angular/core';
import Network from '../algorhitms/neural-nets/network';

@Component({
  selector: 'app-canvas-neural-nets',
  templateUrl: './canvas-neural-nets.component.html',
  styleUrls: ['./canvas-neural-nets.component.scss']
})
export class CanvasNeuralNetsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    let network: Network = new Network();
    let dataset = [
      [0,0,0],
      [0,1,1],
      [1,0,1],
      [1,1,0],
    ]
    network.predict(6,8);
    network.train(dataset, 500);
    network.predict(0,0);
  }
}
