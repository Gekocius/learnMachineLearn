import * as p5 from "p5";
import { Agent } from "./agent"

export default class Population{
    private size: number;
    private agents : Array<Agent> = [];
    private canvasW;
    private canvasH;
    public mutationRate: number;
    public generationCount : number = 0;

    constructor(size: number, mutationRate: number){
        this.size = size;
        this.mutationRate = mutationRate;
        this.seedPopulation();
        this.calculateFitness();
    }

    public reset() : void{
        this.agents = [];
        this.seedPopulation();
        this.calculateFitness();
    }

    public async run() {
        while (!this.targetAchieved()) {       
            let offsprings : Array<Agent> = this.agents[0].breed(this.agents[1]);
            if (this.shouldMutate()) {
                offsprings[0].mutate();
                offsprings[1].mutate();
            }
            this.agents[this.size - 1] = offsprings[0];
            this.agents[this.size - 2] = offsprings[1];
            this.calculateFitness();
            this.generationCount++;

            if (this.generationCount === 5000) {
                this.generationCount = 0;
                break;
            }
            await this.sleep(100);
        }
        console.log(this.generationCount);
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

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    
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
            let hexR : number = parseInt(agent.genes.substring(0,2), 16);
            let hexG : number = parseInt(agent.genes.substring(2,4), 16);
            let hexB : number = parseInt(agent.genes.substring(4), 16);
            agent.fitness = hexR + hexG + hexB;
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