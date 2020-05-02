import Neuron from './neuron';

export default class Layer {
    public neurons: Array<Neuron> = [];
    public weightsMatrix: number[][] = [];
    public deltas: number[] = [];

    constructor(previousLayer: Layer = null, neuronCount: number) {
        if(previousLayer !== null){
            for (let i = 0; i < neuronCount; i++) {
                let newNeuron = new Neuron(previousLayer.neurons);
                this.neurons.push(newNeuron);
                this.appendWeightMatrix(i, newNeuron);
                this.deltas.push(0);
            }
        }
        else{
            for (let i = 0; i < neuronCount; i++) {
                this.neurons.push(new Neuron(null));
            }
        }
    }

    private appendWeightMatrix(neuronIndex: number, neuron: Neuron): void{
        this.weightsMatrix.push([]);
        for (let weightIndex = 0; weightIndex < neuron.connections.length; weightIndex++) {
            let connection: [Neuron, number] = neuron.connections[weightIndex];
            this.weightsMatrix[neuronIndex].push(connection[1]);
        }
    }

    public cacheDeltas(): void{
        for (let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            this.deltas[neuronIndex] = this.neurons[neuronIndex].delta;
        }
    }

    public setDeltasToNeurons(){
        for (let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            this.neurons[neuronIndex].delta = this.deltas[neuronIndex];
        }
    }

    public setWeightsToNeurons(){
        for (let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            let neuron: Neuron = this.neurons[neuronIndex];
            for (let weightIndex = 0; weightIndex < neuron.connections.length; weightIndex++) {
                let connection: [Neuron, number] = neuron.connections[weightIndex];
                connection[1] = this.weightsMatrix[neuronIndex][weightIndex];
            }   
        }
    }

    public cacheWeightMatrix(): void{
        for (let neuronIndex = 0; neuronIndex < this.neurons.length; neuronIndex++) {
            let neuron: Neuron = this.neurons[neuronIndex];
            for (let weightIndex = 0; weightIndex < neuron.connections.length; weightIndex++) {
                let connection: [Neuron, number] = neuron.connections[weightIndex];
                this.weightsMatrix[neuronIndex][weightIndex] = connection[1];
            }   
        }
    }
}