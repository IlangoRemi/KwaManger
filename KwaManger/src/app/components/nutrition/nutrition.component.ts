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
    component.instance.test = listeInfosNutri[0];
  }

}
