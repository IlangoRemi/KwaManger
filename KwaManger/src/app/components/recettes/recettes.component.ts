import { Component, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { RecetteComponent } from '../recette/recette.component';
import { Subscription } from 'rxjs';
import { EnvoiAlimentsService } from '../envoi-aliments.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  static infoNutri : boolean = false;
  apiKey = "&app_key=7e75073a08906ea21a48e21d07af238b";
  apiId = "&app_id=e323e869";
  random = "&random=true";
  type = "public"


  @ViewChild('placeholder', { read: ViewContainerRef, static: true})
  public placeholder!: ViewContainerRef;

  listeAlimSub!: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private envoiAlimentsService:EnvoiAlimentsService) { 
    this.listeAlimSub = this.envoiAlimentsService.getListeAlim().subscribe(listeAlim => {
      this.fetchRecipes(listeAlim.listeAlim);
    })
  }

  ngOnInit(): void {
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
    console.log(ingredients);
    const mappedIngreds = ingredients
      .map((ingredient, idx) => {
        if (idx < ingredients.length - 1) {
          return ingredient + "+";
        } else {
          return ingredient;
        }
      })
      .join("");
  
    const url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mappedIngreds + "&app_id=e323e869&app_key=7e75073a08906ea21a48e21d07af238b&ingr=8&random=true";

    console.log(url);

    let recipes = this.requeteApi(url);
    this.placeholder.clear();
    let limit = 0;
    recipes.then(data => {
      for(const recette of data.hits){
        if(limit > 3){
          break;
        }
        const componentFactory = this.resolver.resolveComponentFactory(RecetteComponent);
        const component = this.placeholder.createComponent(componentFactory);
        component.instance.titre = recette.recipe.label;
        component.instance.image = recette.recipe.image;
        component.instance.ingredients = recette.recipe.ingredientLines;
        component.instance.temps = recette.recipe.totalTime;
        component.instance.avertissement = recette.recipe.cautions;
        component.instance.nutriments = recette.recipe.totalNutrients;
        limit++;
      }
    });
  };
}
