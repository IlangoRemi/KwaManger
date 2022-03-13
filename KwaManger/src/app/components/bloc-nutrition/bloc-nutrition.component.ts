import { Component, OnInit } from '@angular/core';
import { RecettesComponent } from '../recettes/recettes.component';

@Component({
  selector: 'app-bloc-nutrition',
  templateUrl: './bloc-nutrition.component.html',
  styleUrls: ['./bloc-nutrition.component.css']
})
export class BlocNutritionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  infos(recette: string): void{
    if (RecettesComponent.getInfoNutri() == true) {
      let zoneSuppression = document.getElementsByClassName('infosNutri')!;
      let oldElement = document.getElementsByClassName('nutrition');

      zoneSuppression[0].removeChild(oldElement[0]);      
    }
    
    let zoneAjout = document.getElementsByClassName('infosNutri')!;
    let div = document.createElement('div');
    div.className = 'nutrition';
    let el = document.createElement('p');
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.borderRadius = "5px 5px 5px 5px";
    el.style.border = "1px solid";
    el.style.boxShadow = "2px 2px 2px black";
    el.innerHTML = recette;
    div.appendChild(el);
    
    zoneAjout[0].appendChild(div);
  }
}
