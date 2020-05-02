import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneticAlgPageComponent } from './genetic-alg-page/genetic-alg-page.component';
import { NeuralNetPageComponent } from './neural-net-page/neural-net-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';

const routes: Routes = [
  {path:"geneticke-algoritmy", component: GeneticAlgPageComponent},
  {path:"neuronove-site", component: NeuralNetPageComponent},
  {path:"", component: IntroPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
