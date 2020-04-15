import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneticAlgPageComponent } from './genetic-alg-page/genetic-alg-page.component';
import { NeuralNetPageComponent } from './neural-net-page/neural-net-page.component';

const routes: Routes = [
  {path:"geneticke-algoritmy", component: GeneticAlgPageComponent},
  {path:"neuronove-site", component: NeuralNetPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
