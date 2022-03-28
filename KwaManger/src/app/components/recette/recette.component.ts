import { Component, Input, OnInit } from '@angular/core';
import { EnvoiInfosNutriService } from '../envoi-infos-nutri.service';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {

  // Variables représentant les informations de la recette (titre, image, ingrédients, etc)
  @Input() titre: string = "Recette";
  @Input() image: string = "../../assets/img/recetteEx.jpg";
  @Input() ingredients: string[] = [];
  @Input() temps: string = "";
  @Input() avertissement: string[] = [];
  @Input() nutriments: any;

  // Informations nutritionnelles de la recette
  listeInfosNutri: string[] = [];

  /**
   * Constructeur d'une recette
   * @param envoiInfosNutriService Service d'envoi des informations nutritionnelles
   */
  constructor(private envoiInfosNutriService:EnvoiInfosNutriService) {
   }

  ngOnInit(): void {
  }

  /**
   * Méthode se déclenchant lors d'un clic sur une recette.
   * Construit un tableau des différentes informations nutritionnelles et l'envoi au composant nutrition
   * par le service d'envoi des informations nutritionnelles.
   */
  envoiInfosNutri(){
    // Construction du tableau des informations nutritionnelles
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
    // Envoi du tableau par le service d'envoi des informations nutritionnelles au composant nutrition
    this.envoiInfosNutriService.envoiInfosNutri(this.listeInfosNutri);
  }  
}
