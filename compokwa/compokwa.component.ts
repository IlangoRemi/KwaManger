import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compokwa',
  templateUrl: './compokwa.component.html',
  styleUrls: ['./compokwa.component.scss']
})
export class CompokwaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Recette{
  id: number;
  titre: string;
  nbPortions: number;
  listeIngredients: string[];
  calories: number;
  tempsPreparation: number;
  auteur: string;
  url: string;
}
