import { Component, Input, OnInit } from '@angular/core';
import { EnvoiInfosNutriService } from '../envoi-infos-nutri.service';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  @Input() titre: string = "Recette";
  @Input() image: string = "";

  listeInfosNutri: string[] = [];

  constructor(private envoiInfosNutriService:EnvoiInfosNutriService) { }

  ngOnInit(): void {
  }

  envoiInfosNutri(){
    this.envoiInfosNutriService.envoiInfosNutri(this.listeInfosNutri);
  }
}
