import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infos-nutri',
  templateUrl: './infos-nutri.component.html',
  styleUrls: ['./infos-nutri.component.css']
})
export class InfosNutriComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  infos(recette: string): void{
    let zoneAjout = document.getElementById('infosNutri')!;
    let el = document.createElement('p');
    el.innerHTML = recette;

    zoneAjout.appendChild(el);
  }
}
