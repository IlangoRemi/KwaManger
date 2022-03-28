import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BlocNutritionComponent } from '../bloc-nutrition/bloc-nutrition.component';
import { Subscription } from 'rxjs';
import { EnvoiInfosNutriService } from '../envoi-infos-nutri.service'

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {

  // Emplacement de l'ajout de composants dynamiques correspondants aux informations nutritionnelles
  @ViewChild('placeholder', { read: ViewContainerRef, static: true})
  public placeholder!: ViewContainerRef;

  // Liste des informations nutritionnelles receptionnées
  listeInfosNutriSub!: Subscription;

  /**
   * Constructeur du bloc nutrition
   * @param resolver Resolver du composant nutrition
   * @param envoiInfosNutriService Service de communication des informations nutritionnelles
   */
  constructor(private resolver: ComponentFactoryResolver, private envoiInfosNutriService:EnvoiInfosNutriService) { 
    this.listeInfosNutriSub = this.envoiInfosNutriService.displayInfosNutri().subscribe(listeInfosNutri => {
      this.displayInfosNutri(listeInfosNutri.listeInfosNutri);
    })
  }

  ngOnInit(): void {
  }

  /**
   * Méthode générant le composant qui comporte les informations nutritionnelles de la recette qui a été selectionnée
   * @param listeInfosNutri Liste contenant les informations nutritionnelles
   */
  displayInfosNutri(listeInfosNutri: string[]): void {
    // Enlève toute information nutritionnelle déjà présente
    this.placeholder.clear();

    // Créer le composant et envoi les informations correspondantes à celui-ci
    const componentFactory = this.resolver.resolveComponentFactory(BlocNutritionComponent);
    const component = this.placeholder.createComponent(componentFactory);
    component.instance.titre = listeInfosNutri[0];
    component.instance.kcal = Math.round(parseInt(listeInfosNutri[1])).toString();
    component.instance.prot = Math.round(parseInt(listeInfosNutri[2])).toString();
    component.instance.fat = Math.round(parseInt(listeInfosNutri[3])).toString();
    component.instance.carb = Math.round(parseInt(listeInfosNutri[4])).toString();
    component.instance.cho = Math.round(parseInt(listeInfosNutri[5])).toString();
    component.instance.so = Math.round(parseInt(listeInfosNutri[6])).toString();
    component.instance.calc = Math.round(parseInt(listeInfosNutri[7])).toString();
    component.instance.magne = Math.round(parseInt(listeInfosNutri[8])).toString();
    component.instance.pota = Math.round(parseInt(listeInfosNutri[9])).toString();
    component.instance.iron = Math.round(parseInt(listeInfosNutri[10])).toString();
  }
}
