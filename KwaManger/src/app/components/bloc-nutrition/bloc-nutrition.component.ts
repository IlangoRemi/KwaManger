import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloc-nutrition',
  templateUrl: './bloc-nutrition.component.html',
  styleUrls: ['./bloc-nutrition.component.css']
})
export class BlocNutritionComponent implements OnInit {

  // Informations nutritionnelles de la recette correspondante
  @Input() titre: string = "titre";
  @Input() kcal: string = "?";
  @Input() prot: string = "?";
  @Input() fat: string = "?";
  @Input() carb: string = "?";
  @Input() cho: string = "?";
  @Input() so: string = "?";
  @Input() calc: string = "?";
  @Input() magne: string = "?";
  @Input() pota: string = "?";
  @Input() iron: string = "?";

  constructor() { }

  ngOnInit(): void {
  }
}
