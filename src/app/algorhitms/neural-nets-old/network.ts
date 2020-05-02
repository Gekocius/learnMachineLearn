import Neuron from './neuron';
import Layer from './layer';

export default class Network {
    //Inputs
    private x1: number;
    private x2: number;
    private learningRate: number;
    private layers: Layer[] = [];
    private networkError: number = 0;

    constructor() {
        // Initialize 3 layers + 1 input layer
        // Hidden layers -  2 with 2 neurons
        // Output layer - 1 with 1 neuron
        let inputLayer: Layer = new Layer(null, 2);
        this.layers.push(inputLayer);
        for (let i = 1; i < 3; i++) {
            this.layers[i] = new Layer(this.layers[i-1], 2);
        }
        let outputLayer: Layer = new Layer(this.layers[this.layers.length-1], 1);
        this.layers.push(outputLayer);
    }

    //Train with tuples of x1, x2 and expected result. Run given number of epochs
    public train(data: number[][], epochTarget: number): void{
        for (let currentEpoch = 0; currentEpoch < epochTarget; currentEpoch++) {
            data.forEach(dataTuple =>{
                let prediction: number = this.forwardPass(dataTuple[0], dataTuple[1]);
                this.backpropagate(prediction, dataTuple[2]);
            })
        }
    }

    private backpropagate(prediction: number, actual: number): void{
        let gradient: number = this.costFunctionDerivative(prediction, actual);
        let outputLayer = this.layers[this.layers.length-1];
        let outputNeuron = outputLayer.neurons[0];
        outputNeuron.delta = gradient * this.sigmoidFunctionDerivate(outputNeuron.z);
        outputLayer.cacheDeltas();
        outputLayer.cacheWeightMatrix();
        outputNeuron.bias = outputNeuron.bias - (this.learningRate * outputNeuron.delta);
        outputNeuron.connections.forEach((connection: [Neuron, number]) => {
            connection[1] = connection[1] - (this.learningRate * (connection[0].lastActivation * outputNeuron.delta));
        });

        //Hidenn layers update
        for (let i = this.layers.length-2; i > 1; i--) {
            let currentLayer: Layer = this.layers[i];
            let previousLayer: Layer = this.layers[i+1]
            for (let deltaIndex = 0; deltaIndex < currentLayer.deltas.length; deltaIndex++) {
                let matrixSum = 0 
                for (let neuronIndex = 0; neuronIndex < previousLayer.weightsMatrix.length; neuronIndex++) {
                    console.log(deltaIndex);
                    console.log(previousLayer.neurons[deltaIndex]);
                    matrixSum += previousLayer.weightsMatrix[neuronIndex][deltaIndex] * previousLayer.neurons[deltaIndex].delta;
                }
                currentLayer.deltas[deltaIndex] = matrixSum * this.sigmoidFunctionDerivate(currentLayer.neurons[deltaIndex].z);
            }
            currentLayer.setDeltasToNeurons();
            // Update Weights on Layer
            for (let neuronIndex = 0; neuronIndex < currentLayer.weightsMatrix.length; neuronIndex++) {
                for (let weightIndex = 0; weightIndex < currentLayer.weightsMatrix[neuronIndex].length; weightIndex++) {
                    let partialDerivative: number = currentLayer.neurons[neuronIndex].connections[weightIndex][0].lastActivation * currentLayer.deltas[neuronIndex];
                    currentLayer.weightsMatrix[neuronIndex][weightIndex] = currentLayer.weightsMatrix[neuronIndex][weightIndex] - (this.learningRate * partialDerivative)
                }
            }
            currentLayer.setWeightsToNeurons();
            //Update biases on current Layer
            currentLayer.neurons.forEach(neuron=>{
                neuron.bias = neuron.bias - (this.learningRate * neuron.delta); 
            })

            // currentNeuron.connections[0].weight
        }
    }

    public forwardPass(x1: number, x2: number) : number{
        // Set inputs on input layer
        this.layers[0].neurons[0].lastActivation = x1;
        this.layers[0].neurons[1].lastActivation = x2;
        // We must skip input layer
        for (let i = 1; i < this.layers.length; i++) {
            let currentLayer = this.layers[i];
            currentLayer.neurons.forEach(neuron => {
                neuron.activate();
            })
        }
        return this.layers[3].neurons[0].lastActivation;
    }

    public predict(x1: number, x2: number){
        let preditction = this.forwardPass(x1,x2);
        console.log(preditction);
    }

    private sigmoidFunction(x: number): number {
        return (Math.pow(Math.E, x))/(Math.pow(Math.E, x)+1);
    }

    private sigmoidFunctionDerivate(x: number): number{
        return this.sigmoidFunction(x) * (1 - this.sigmoidFunction(x));
    }

    private costFunction(prediction: number, actual: number): number{
        return Math.pow(prediction - actual,2);
    }

    // Derivative with respect to activation of last layer 
    private costFunctionDerivative(prediction: number, actual: number): number{
        return 2*(prediction-actual)
    }
}