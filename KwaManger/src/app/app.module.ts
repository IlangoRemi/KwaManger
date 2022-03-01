import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarreAlimentsComponent } from './components/barre-aliments/barre-aliments.component';
import { HeadComponent } from './components/head/head.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { RecetteComponent } from './components/recette/recette.component';
import { InfosNutriComponent } from './components/infos-nutri/infos-nutri.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    BarreAlimentsComponent,
    HeadComponent,
    RecettesComponent,
    NutritionComponent,
    RecetteComponent,
    InfosNutriComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
