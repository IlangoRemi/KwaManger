import { Component, OnInit } from '@angular/core';
import { InfosNutriComponent } from '../infos-nutri/infos-nutri.component';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }

  displayInfos(){
    let nutriComp = new InfosNutriComponent();
    nutriComp.infos("Blanquette");
  }

}
