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

  updateIngredient() {
    let zoneAjout = document.getElementById('barreAliments')!;
    let barre = <HTMLInputElement> document.getElementById('barreAlim');
    let el = document.createElement('button');

    el.className = 'boutonAliment';
    el.innerHTML = barre.value;

    zoneAjout.appendChild(el);


    el.onclick = function () {
      zoneAjout.removeChild(el);
    }
  }
}
