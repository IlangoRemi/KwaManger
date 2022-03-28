import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { RecetteComponent } from './components/recette/recette.component';
import { MapComponent } from './components/map/map.component';
import { BlocNutritionComponent } from './components/bloc-nutrition/bloc-nutrition.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    RecettesComponent,
    RecetteComponent,
    MapComponent,
    BlocNutritionComponent,
    NutritionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
