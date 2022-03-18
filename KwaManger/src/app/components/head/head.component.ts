import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})


export class HeadComponent {
  model= '';

listeAlim:string[] =[];


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

// vide la barre de recherche lorsqu'on appuie dur le bouton ajouter
  viderBarre(){
    this.model= "";
  }
}
