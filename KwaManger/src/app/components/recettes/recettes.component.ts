import { Component, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { RecetteComponent } from '../recette/recette.component';
import { BlocNutritionComponent } from '../bloc-nutrition/bloc-nutrition.component';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  static infoNutri : boolean = false;
  apiKey = "&app_key=7e75073a08906ea21a48e21d07af238b";
  apiId = "&app_id=e323e869";
  maxIngreds = `&ingr=6`;


  constructor() { }

  ngOnInit(): void {
  }

  static setInfoNutri(boolean: boolean): void {
    this.infoNutri = boolean;
  }

  static getInfoNutri(): boolean {
    return this.infoNutri;
  }

  requeteApi = async(url: string) => {

    return fetch(url).then(response => {
      if(response.status >=200 && response.status < 300){
        return response.json();
      }else{
        return new Error('Erreur serveur');
      }
    })
    .catch(error => {
      alert(error);
      throw new Error('Erreur chargement');
    });
  };

  fetchRecipes = async (ingredients: String[]) => {
    const mappedIngreds = ingredients
      .map((ingredient, idx) => {
        if (idx < ingredients.length - 1) {
          return ingredient + "+";
        } else {
          return ingredient;
        }
      })
      .join("");

    const url = "https://api.edamam.com/search?q=" + mappedIngreds + this.maxIngreds + this.apiId + this.apiKey;
    console.log("Voici l'url : " + url);

    let zoneAjout = document.getElementById("recettes")!;
    let recipes = this.requeteApi(url);
    recipes.then(data => {
      for(const recette of data.hits){
        let ul = document.createElement("ul");
        let titre = document.createElement("li");
        let image = document.createElement("li");
        let imageSrc = document.createElement("img");

        imageSrc.src = recette.recipe.image;
        image.appendChild(imageSrc);
        titre.innerHTML = recette.recipe.label;
        ul.appendChild(titre);
        ul.appendChild(image);
        //ul.onclick = this.displayInfos(recette.recipe.label)
        zoneAjout.appendChild(ul);
      }
    });
  };

  displayInfos(titre: string): any{
    let nutriComp = new BlocNutritionComponent();
    nutriComp.infos(titre);
    RecettesComponent.setInfoNutri(true);
  }
}
