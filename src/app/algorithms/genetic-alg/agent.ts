export class Agent{
    public fitness : number;
    public genes : string;
    constructor(generateColor: boolean = true){
        if (generateColor) {
            this.genes = this.randomColor();   
        }
    }

    /**
     * Returns random color in hexadecimal string
     */
    private randomColor() : string
    {
        let letters: string = '0123456789ABCDEF';
        let color: string = "";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Cross this agent with the given second agent producing two new offsprings
     * @param secondAgent Second agent to cross with
     */
    public breed(secondAgent : Agent) : Array<Agent>
    {
        let newGenes1 : string = this.genes.substring(0,3).concat(secondAgent.genes.substring(3));
        let newGenes2 : string = secondAgent.genes.substring(0,3).concat(this.genes.substring(3));
        let newAgent1 : Agent = new Agent(false);
        let newAgent2 : Agent = new Agent(false);

        newAgent1.genes = newGenes1;
        newAgent2.genes = newGenes2;
        return [newAgent1, newAgent2];
    }

    /**
     * Modify random agent gene by -1. If the chosen gene is at maximum value, overflows back to minimal value.
     */
    public mutate()
    {
        // Choose random index from 0 to 5
        let genesIndex: number = Math.floor(Math.random() * 6);
        let splittedGenes: Array<string> = this.genes.split("");
        let decimalNumber: number  = parseInt(splittedGenes[genesIndex], 16)
        if (decimalNumber === 0 ) {
            decimalNumber = 15
        }
        else{
            decimalNumber -= 1;
        }
        let hexString: string = decimalNumber.toString(16);
        splittedGenes[genesIndex] = hexString;
        this.genes = splittedGenes.join("");
    }
}