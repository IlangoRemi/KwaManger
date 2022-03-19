import { Component, Input, OnInit } from '@angular/core';
import { EnvoiInfosNutriService } from '../envoi-infos-nutri.service';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  @Input() titre: string = "Recette";
  @Input() image: string = "../../assets/img/recetteEx.jpg";
  @Input() ingredients: string[] = [];
  @Input() temps: string = "";
  @Input() avertissement: string[] = [];

  listeInfosNutri: string[] = [];

  constructor(private envoiInfosNutriService:EnvoiInfosNutriService) {
   }

  ngOnInit(): void {
  }

  displayIngredients(){
    const zoneAjout = document.getElementById(this.titre)!;
    let div = document.createElement("div");
    div.className = "contenu";
    let p = document.createElement("p");
    p.innerHTML = this.ingredients.join(",<br>");
    div.appendChild(p);
    zoneAjout.appendChild(div);
  }

  envoiInfosNutri(){
    this.listeInfosNutri.push(this.titre);
    this.envoiInfosNutriService.envoiInfosNutri(this.listeInfosNutri);
  }
}
