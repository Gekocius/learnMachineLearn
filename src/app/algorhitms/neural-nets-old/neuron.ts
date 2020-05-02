export default class Neuron {
    //Reference to neuron in prevous layer + weight for the connection
    public connections: Array<[Neuron, number]> = [];
    public delta: number;
    public z: number;
    public lastActivation: number;
    public bias: number;

    constructor(previousNeurons: Array<Neuron> = null, inputValue : number = 0) {
        if (previousNeurons === null) {
            this.lastActivation = inputValue;
        }
        else{
            previousNeurons.forEach(neuron => {
                this.connections.push([neuron, this.randomWeight()])
            });
            this.bias = this.randomWeight();
        }
    }

    public activate(): void{
        // Compute z
        this.z = 0;
        this.connections.forEach(connection => {
            this.z += connection[0].lastActivation * connection[1];
        })
        this.z += this.bias
        this.lastActivation = this.sigmoidFunction();
    }

    private sigmoidFunction(): number {
        return (Math.pow(Math.E, this.z))/(Math.pow(Math.E, this.z)+1);
    }

    private randomWeight(): number{
        return Math.floor(Math.random()*10);
    }
}