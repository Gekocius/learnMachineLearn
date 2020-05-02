import {create, all} from 'mathjs';
import Layer from '../neural-nets/layer';
import * as p5 from 'p5';
import LayerVisual from './layerVisual';

const math = create(all, {});

export default class Network{
    public canvasW: number;
    public canvasH: number;
    public layerVisuals : LayerVisual[] = [];

    public layers: Layer[] = [];
    private learningRate = 0.1;

    /**
     * Intializes the network with given architecture - 2 input neurons, 
     * 2 hidden layers with 2 neurons each and output layer with one neuron
     */
    constructor() {
        let inputLayer: Layer = new Layer(2,0,true);
        this.layers.push(inputLayer);
        let previousNeuronCount: number = inputLayer.neuronCount;
        // 2 hidden layers
        for (let i = 0; i < 2; i++) {
            this.layers.push(new Layer(2, previousNeuronCount));
            previousNeuronCount = this.layers[i].neuronCount;
        }
        let outputLayer: Layer = new Layer(1, previousNeuronCount);
        this.layers.push(outputLayer);
        let initialLayers = JSON.stringify(this.layers);
        console.log(initialLayers);
    }

    
    /**
     * Train with tuples of x1, x2 and expected result. Run given number of epochs.
     * @param data Array of training data
     * @param epochTarget How many epochs will the training run for
     */
    public async train(data: number[][], epochTarget: number): Promise<void> {
        for (let currentEpoch = 0; currentEpoch < epochTarget; currentEpoch++) {
            data.forEach(dataTuple => {
                let prediction: number = this.feedforward(dataTuple[0], dataTuple[1]);
                this.backpropagate(prediction, dataTuple[2]);
            })
            if (currentEpoch % 1000 === 0) {
                await this.sleep(500);
            }
        }
        console.log("Neural network finished training");
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    /**
     * Do forward pass thourgh the network. Returns a prediction for given inputs.
     * @param x1 First input
     * @param x2 Second input
     */
    public feedforward(x1: number, x2: number): number{
        this.layers[0].activations = [x1,x2];
        // For each layer starting from first hidden
        for (let i = 1; i < this.layers.length; i++) {
            let currentLayer: Layer = this.layers[i];
            let previousLayer: Layer = this.layers[i-1];
            // Compute z matrix in two steps
            currentLayer.z = math.multiply(currentLayer.weights, previousLayer.activations) as unknown as number[];
            currentLayer.z = math.add(currentLayer.z, currentLayer.biases) as number[];
            // Apply sigmoid activation
            for (let zi = 0; zi < currentLayer.z.length; zi++) {
                currentLayer.activations[zi] = this.sigmoidFunction(currentLayer.z[zi]);
            }
        }
        return this.layers[this.layers.length-1].activations[0];
    }

    /**
     * Sends the error back through the network and updates weights and biases using gradient descent.
     * @param prediction Prediction made by forward pass 
     * @param actual Result expepected by data tuple from data set
     */
    public backpropagate(prediction: number, actual: number): void{
        //Handle output layer separately
        let outputLayer: Layer = this.layers[this.layers.length-1];
        let cDerivative: number = this.costFunctionDerivative(prediction, actual);
        // There is only one output neuron so we can use index
        outputLayer.delta[0] = cDerivative * this.sigmoidFunctionDerivate(outputLayer.z[0]);
        // Update bias for output
        outputLayer.biases[0] -= this.learningRate * outputLayer.delta[0];
        // Update weights for output
        let lastHiddenLayer = this.layers[this.layers.length-2];
        for (let j = 0; j < outputLayer.weights.length; j++) {
            for (let k = 0; k < outputLayer.weights[j].length; k++) {
                let weightDerivative = lastHiddenLayer.activations[k] * outputLayer.delta[j];
                outputLayer.weights[j][k] -= this.learningRate*weightDerivative;
            }
        }
        // --- Rest of the network ---
        // Going backwards
        for (let i = this.layers.length-2; i > 1; i--) {
            let previousLayer: Layer = this.layers[i+1];
            let currentLayer: Layer = this.layers[i]

            // Left part of delta equation
            let transposeMultDelta: number[][] = math.multiply(math.transpose(previousLayer.weights), previousLayer.delta);
            // Right part of delta equation
            let sigmoidDerivatives: number[] = [];
            currentLayer.z.forEach(zi=>{
                sigmoidDerivatives.push(this.sigmoidFunctionDerivate(zi));
            });
            // Calculate delta for current layer
            currentLayer.delta = math.dotMultiply(transposeMultDelta, sigmoidDerivatives) as unknown as number[];

            // Update biases on current layer
            for (let bi = 0; bi < currentLayer.biases.length; bi++) {
                currentLayer.biases[bi] -= this.learningRate * currentLayer.delta[bi];
            }

            //Update weights on current layer
            let nextLayer: Layer = this.layers[i-1];
            for (let j = 0; j < currentLayer.weights.length; j++) {
                for (let k = 0; k < currentLayer.weights[j].length; k++) {
                    let weightDerivative = nextLayer.activations[k] * currentLayer.delta[j];
                    currentLayer.weights[j][k] -= this.learningRate*weightDerivative;
                }
            }
        }
    }

    private sigmoidFunction(z: number): number {
        return math.round(1.0/(1.0+math.exp(-z)),3)
    }

    private sigmoidFunctionDerivate(z: number): number{
        return this.sigmoidFunction(z) * (1 - this.sigmoidFunction(z));
    }

    // Derivative with respect to activation of last layer 
    private costFunctionDerivative(prediction: number, actual: number): number{
        return 2*(prediction-actual)
    }

    /**
     * Sets sketch for p5.js to use
     * @param p p5.js instance used to draw the network
     */
    public sketch(p: p5): any {
        const self: Network = this;
        p.setup = () => p.createCanvas(self.canvasW, self.canvasH);

        p.draw = () => {
            p.background(150);
            self.layerVisuals = [];
            for (let i = 0; i < self.layers.length; i++) {
                let currentLayer: Layer = self.layers[i];
                let newVisual = new LayerVisual(i, currentLayer.neuronCount)
                self.layerVisuals.push(newVisual);
                newVisual.drawLayer(p,self.canvasW,self.canvasH,newVisual);
            }
            //Connections with weights
            for (let li = self.layerVisuals.length-1; li > 0; li--) {
                let currentLayerWeights = self.layers[li].weights;
                let currentLayerNeurons = self.layerVisuals[li].neuronPoints;
                let previousLayerNeurons = self.layerVisuals[li-1].neuronPoints;
                for (let j = 0; j < currentLayerNeurons.length; j++) {
                    for (let k = 0; k < previousLayerNeurons.length; k++) {
                        let weightX = (currentLayerNeurons[j].x-0.1)*self.canvasW;
                        let neuronYDifference = (currentLayerNeurons[j].y-previousLayerNeurons[k].y)*0.2;
                        let weightY = (currentLayerNeurons[j].y-neuronYDifference)*self.canvasH;
                        p.text(Math.round(currentLayerWeights[j][k]*1000)/1000, weightX, weightY);
                        p.line(currentLayerNeurons[j].x*self.canvasW, currentLayerNeurons[j].y*self.canvasH,
                            previousLayerNeurons[k].x*self.canvasW, previousLayerNeurons[k].y*self.canvasH);
                    }
                }
            }
        }

        p.windowResized = () => {
            self.canvasW = document.getElementById("p5sketch").offsetWidth;
            p.resizeCanvas(self.canvasW, self.canvasH);
        }
    }
}