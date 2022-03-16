import { Component, OnInit } from '@angular/core';
//import {writeJsonFile} from 'write-json-file';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  static infoNutri : boolean = false;
  apiKey = "&app_key=7e75073a08906ea21a48e21d07af238b";
  apiId = "&app_id=e323e869";
  maxTime = "&time=30";
  maxIngreds = `&ingr=10`;

  constructor() { }

  ngOnInit(): void {
  }

  static setInfoNutri(boolean: boolean): void {
    this.infoNutri = boolean;
  }

  static getInfoNutri(): boolean {
    return this.infoNutri;
  }

  test(): void {
    this.fetchRecipes("carrot", "chicken");
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
      throw new Error('Erreur charge,ent');
    });
  };

  fetchRecipes = async (...ingredients: String[]) => {
    const mappedIngreds = ingredients
      .map((ingredient, idx) => {
        if (idx < ingredients.length - 1) {
          return ingredient + "+";
        } else {
          return ingredient;
        }
      })
      .join("");
  
    const url = "https://api.edamam.com/search?q=" + mappedIngreds + this.maxIngreds + this.maxTime + this.apiId + this.apiKey;
    console.log("Voici l'url : " + url);

    let recipes = this.requeteApi(url);
    console.log(recipes);
    //await writeJsonFile('recette.json', recipes);

    //fetch url
    /*const recipes = res.data;
    console.log(recipes);*/
    //ajout dans une liste ?
  };
}
