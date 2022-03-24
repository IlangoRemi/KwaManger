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

  @ViewChild('placeholder', { read: ViewContainerRef, static: true})
  public placeholder!: ViewContainerRef;

  listeInfosNutriSub!: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private envoiInfosNutriService:EnvoiInfosNutriService) { 
    this.listeInfosNutriSub = this.envoiInfosNutriService.displayInfosNutri().subscribe(listeInfosNutri => {
      this.displayInfosNutri(listeInfosNutri.listeInfosNutri);
    })
  }

  ngOnInit(): void {
  }

  displayInfosNutri(listeInfosNutri: string[]): void {
    this.placeholder.clear(); 
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
