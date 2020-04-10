import * as p5 from "p5";
import { Agent } from "./agent"

export default class Population{
    private size: number;
    private mutationRate: number;
    private agents : Array<Agent> = [];
    private canvasW;
    private canvasH;
    public generationCount : number = 0;

    constructor(size: number, mutationRate: number){
        this.size = size;
        this.mutationRate = mutationRate;
        this.seedPopulation();
        this.calculateFitness();
    }

    public run() : void{
        while (!this.targetAchieved()) {

            let newAgent : Agent = this.agents[0].breed(this.agents[1]);
            if (this.shouldMutate) {
                newAgent.mutate();
            }
            this.agents[this.size - 1] = newAgent;
            this.calculateFitness();
            this.generationCount++;
            if (this.generationCount % 100 === 0){
                console.log(this.generationCount);
            }
            if (this.generationCount === 5000) {
                console.log(this.agents[1]);
                break;
            }
        }
    }

    public setCanvasSize(w: number, h: number) : void
    {
        this.canvasW = w;
        this.canvasH = h;
    }

    public sketch(p: p5): any {
        p.setup = function () {
            p.createCanvas(this.canvasW, this.canvasH);
        }.bind(this)

        p.draw = function () {
            let radius = Math.floor(this.canvasW*0.05);
            let xIncrement = Math.floor(this.canvasW/5);
            let yInceremt = 50;
            let xStart = Math.floor(this.canvasW/5)
            let x = xStart;
            let y = 30;
            for(let i = 0; i < this.agents.length; i++){
              let genes: string = this.agents[i].genes;
              let r: number = parseInt(genes[0].concat(genes[1]),16);
              let g: number = parseInt(genes[2].concat(genes[3]),16);
              let b: number = parseInt(genes[4].concat(genes[5]),16);  
              p.fill(p.color(r,g,b));
              if(i % 4 == 0 && i != 0){
                y += yInceremt;
                x = xStart;
              }
              p.ellipse(x,y, radius);
              x += xIncrement;
            }
        }.bind(this);

        p.windowResized = function() {
            this.canvasW = document.getElementById("p5sketch").offsetWidth;
            p.resizeCanvas(this.canvasW, this.canvasH);
        }.bind(this)
    }
    
    private shouldMutate() : boolean{
        let randomChance: number = Math.round(Math.random() * 100);
        if (randomChance <= this.mutationRate*100) {
            return true;
        }
        return false;
    }

    private targetAchieved() : boolean{
        if (this.agents[0].fitness === 0) {
            return true;
        }
        return false;
    }

    private seedPopulation(): void {
        for (let i = 0; i < this.size; i++) {
            this.agents.push(new Agent());
        }   
    }

    private calculateFitness(): void {
        this.agents.forEach(agent => {
            let hex : number = parseInt(agent.genes);
            agent.fitness = hex;
        });
        this.agents.sort((a1, a2) => {
            if (a1.fitness > a2.fitness) {
                return 1;
            }
            if (a2.fitness > a1.fitness) {
                return -1;
            }
            return 0;
        })
    }
}