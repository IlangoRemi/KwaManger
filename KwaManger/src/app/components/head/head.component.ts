import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { RecettesComponent } from '../recettes/recettes.component';
import { EnvoiAlimentsService } from '../envoi-aliments.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})


export class HeadComponent {
  model= '';

listeAlim:string[] =[];

  constructor(private envoiAlimentsService:EnvoiAlimentsService) { }

  listeAlimSupprimer(element:string) {
    let index = this.listeAlim.indexOf(element);
    this.listeAlim.splice(index, 1);
  }

// ajoute un ingredient dans une liste et le transforme en bouton qui peut être supprimer
  updateIngredient() {
    let zoneAjout = document.getElementById('barreAliments')!;
    let barre = <HTMLInputElement> document.getElementById('barreAlim');
    let el = document.createElement('button');

    el.className = 'btn btn-primary';
    el.style.margin = "2px";
    el.innerHTML = barre.value;

    const head = this;

    this.listeAlim.push(barre.value);

    zoneAjout.appendChild(el);

    el.onclick = function () {
      zoneAjout.removeChild(el);

      head.listeAlimSupprimer(barre.value);
    }

    console.log(this.listeAlim);
  }

  /**
   * Méthode permettant de communiquer les ingrédient grâce au service de communication d'envoi des ingrédients
   */
  envoyerIngredients(){
    this.envoiAlimentsService.sendListeAlim(this.listeAlim);
  }
  

// vide la barre de recherche lorsqu'on appuie dur le bouton ajouter
  viderBarre(){
    this.model= "";
  }
}
