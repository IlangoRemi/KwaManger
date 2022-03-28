import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { RecetteComponent } from '../recette/recette.component';
import { Subscription } from 'rxjs';
import { EnvoiAlimentsService } from '../envoi-aliments.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  // Clé pour l'API Edamam (Recipes)
  apiKey = environment.apiEdamamKey;
  // ID pour l'API Edamam (Recipes)
  apiId = environment.apiEdamamId;
  // Chaine représentant l'option de génération de recettes aléatoire
  random = "&random=true";
  // Type de la recherche
  type = "public"

  // Emplacement de l'ajout de composants dynamiques correspondants aux recettes
  @ViewChild('placeholder', { read: ViewContainerRef, static: true})
  public placeholder!: ViewContainerRef;

  // Liste des aliments reçus par la barre des tâches
  listeAlimSub!: Subscription;

  /**
   * Constructeur de la classe recettes
   * @param resolver Resolver du composant recettes
   * @param envoiAlimentsService Service de communication en lien avec la barre d'ajout des aliments
   */
  constructor(private resolver: ComponentFactoryResolver, private envoiAlimentsService:EnvoiAlimentsService) { 
    this.listeAlimSub = this.envoiAlimentsService.getListeAlim().subscribe(listeAlim => {
      this.fetchRecipes(listeAlim.listeAlim);
    })
  }

  ngOnInit(): void {
  }

  /**
   * Méthode permettant de receptionner la requete en donnant un URL à l'API Edamam recipes
   * @param url URL pour la requête à l'API
   */
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

  /**
   * Méthode permettant de chercher les recettes dans le résultat de requête,
   * générer les composants et leur envoyer les informations pour leur création
   * @param ingredients Ingrédients à envoyer dans la requête à l'API
   */
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
  
    // URL formé avec les différentes informations pour la requête
    const url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mappedIngreds + "&app_id=e323e869&app_key=7e75073a08906ea21a48e21d07af238b&ingr=8&random=true";

    let recipes = this.requeteApi(url);
    this.placeholder.clear();
    let limit = 0;

    // Parcours les recettes de la requête, créé un composant pour chaque recette avec les informations la concernant
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
