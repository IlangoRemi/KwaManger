import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvoiInfosNutriService {

  constructor() { }

  private subject = new Subject<any>();

  envoiInfosNutri(listeInfosNutri: string[]){
    this.subject.next({listeInfosNutri});
  }

  displayInfosNutri(): Observable<any>{
    return this.subject.asObservable();
  }
}
