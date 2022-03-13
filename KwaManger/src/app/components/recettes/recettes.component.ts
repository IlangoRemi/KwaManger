import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {

  static infoNutri : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  static setInfoNutri(boolean: boolean): void {
    this.infoNutri = boolean;
  }

  static getInfoNutri(): boolean {
    return this.infoNutri;
  }
}
