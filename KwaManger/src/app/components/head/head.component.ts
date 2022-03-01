import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  updateIngredient() {
    let zoneAjout = document.getElementById('barreAliments')!;
    let barre = <HTMLInputElement> document.getElementById('barreAlim');
    const el = document.createElement('button');
    el.className = 'boutonAliment';

    el.innerHTML = barre.value;

    zoneAjout.appendChild(el);
  }
}
