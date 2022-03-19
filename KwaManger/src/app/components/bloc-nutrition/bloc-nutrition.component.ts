import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloc-nutrition',
  templateUrl: './bloc-nutrition.component.html',
  styleUrls: ['./bloc-nutrition.component.css']
})
export class BlocNutritionComponent implements OnInit {

  @Input() test: string = "nutri";

  constructor() { }

  ngOnInit(): void {
  }
}
