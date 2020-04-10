export class Agent{
    public fitness : number;
    public genes : string;
    constructor(generateColor: boolean = true){
        if (generateColor) {
            this.genes = this.randomColor();   
        }
    }

    private randomColor() : string
    {
        let letters: string = '0123456789ABCDEF';
        let color: string = "";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public breed(secondAgent : Agent) : Agent
    {
        let newGenes : string = this.genes.substring(0,3).concat(secondAgent.genes.substring(3));
        let newAgent : Agent = new Agent(false);
        newAgent.genes = newGenes;
        return newAgent;
    }

    public mutate()
    {
        // Choose random index from 0 to 5
        let genesIndex: number = Math.floor(Math.random() * 6);
        let splittedGenes: Array<string> = this.genes.split("");
        let decimalNumber: number  = parseInt(splittedGenes[genesIndex], 16)
        if (decimalNumber === 15 ) {
            decimalNumber = 0
        }
        else{
            decimalNumber++;
        }
        let hexString: string = decimalNumber.toString(16);
        splittedGenes[genesIndex] = hexString;
        this.genes = splittedGenes.join("");
    }
}