import { Component, Input, OnInit } from '@angular/core';
import { BlocNutritionComponent } from '../bloc-nutrition/bloc-nutrition.component';
import { RecettesComponent } from '../recettes/recettes.component';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  @Input() titre: string = "Recette";

  constructor() {
   }

  ngOnInit(): void {
  }

  displayInfos(){
    let nutriComp = new BlocNutritionComponent();
    nutriComp.infos("Blanquette");
    RecettesComponent.setInfoNutri(true);
  }
}
