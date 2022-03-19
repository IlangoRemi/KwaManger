import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvoiAlimentsService {

  constructor() { }

  private subject = new Subject<any>();
  
  sendListeAlim(listeAlim: string[]){
    this.subject.next({listeAlim});
  }
  
  getListeAlim(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
