import {create, all, Matrix} from 'mathjs';

const math = create(all,{});

/**
 * Used as support class in all network calculations
 */
export default class Layer {
    public neuronCount: number;
    public weights: number[][] = [];
    public biases: number[] = [];
    public z:  number[] = []
    public delta: number[] = [];
    public activations: number[] = [];

    constructor(neuronCount: number, previousNeuronCount: number, isInput: boolean = false) {
        this.neuronCount = neuronCount;
        if (!isInput) {
            for (let i = 0; i < neuronCount; i++) {
                this.weights.push([]);
                this.biases.push(math.round(math.random(0.5,1),3));
                this.z.push(0);
                this.delta.push(0);
                this.activations.push(0);
                for (let j = 0; j < previousNeuronCount; j++) {
                    this.weights[i].push(math.round(math.random(0.5,1),3));
                }
            }   
        }
    }
}