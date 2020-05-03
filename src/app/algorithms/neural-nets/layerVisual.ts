import * as p5 from "p5";
import NeuronPoint from './neuronPoint';

/**
 * Used only for visualization of the neuron layer, not relevant in calculations
 */
export default class LayerVisual {
    public layerNumber: number;
    public neuronPoints: NeuronPoint[] = [];
    private layerX: number;
    constructor(layerNumber: number, neuronCount: number) {
        this.layerNumber = layerNumber;
        this.layerX = 0.10 + (0.24*layerNumber);
        let y = 0.30;
        for (let i = 0; i < neuronCount; i++) {
            this.neuronPoints.push(new NeuronPoint(this.layerX, y*(i+1)))
        }
    }

    /**
     * 
     * @param p p5.js instance to use for drawing
     * @param canvasW Canvas element width
     * @param canvasH Canvas element height
     * @param self Instance of this layer visual
     */
    public drawLayer(p: p5, canvasW:number, canvasH:number, self: LayerVisual) {
        p.fill(0,0,0);
        let neuronDiameter = canvasW * 0.035;
        if (self.layerNumber === 3) {
            this.neuronPoints[0].y = 0.45;
            p.circle(this.neuronPoints[0].x*canvasW, this.neuronPoints[0].y*canvasH, neuronDiameter)
        }
        else{
            self.neuronPoints.forEach(neuron =>{
                p.circle(neuron.x*canvasW, neuron.y*canvasH, neuronDiameter);
            });
        }
    }
}