import { Component, Input, OnInit } from '@angular/core';
import { EnvoiInfosNutriService } from '../envoi-infos-nutri.service';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  @Input() titre: string = "Recette";
  @Input() image: string = "../../assets/img/recetteEx.jpg";
  @Input() ingredients: string[] = [];
  @Input() temps: string = "";
  @Input() avertissement: string[] = [];
  @Input() nutriments: any;

  listeInfosNutri: string[] = [];

  constructor(private envoiInfosNutriService:EnvoiInfosNutriService) {
   }

  ngOnInit(): void {
  }

  envoiInfosNutri(){
    this.listeInfosNutri.push(this.titre);
    this.listeInfosNutri.push(this.nutriments.ENERC_KCAL.quantity);
    this.listeInfosNutri.push(this.nutriments.PROCNT.quantity);
    this.listeInfosNutri.push(this.nutriments.FAT.quantity);
    this.listeInfosNutri.push(this.nutriments.CHOCDF.quantity);
    this.listeInfosNutri.push(this.nutriments.CHOLE.quantity);
    this.listeInfosNutri.push(this.nutriments.NA.quantity);
    this.listeInfosNutri.push(this.nutriments.CA.quantity);
    this.listeInfosNutri.push(this.nutriments.MG.quantity);
    this.listeInfosNutri.push(this.nutriments.K.quantity);
    this.listeInfosNutri.push(this.nutriments.FE.quantity);
    this.envoiInfosNutriService.envoiInfosNutri(this.listeInfosNutri);
  }  
}
