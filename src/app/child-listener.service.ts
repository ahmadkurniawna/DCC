import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildListenerService {
  private notify = new Subject<any>();


  notifyObservable$ = this.notify.asObservable();

  constructor() { }

  public notifyOther(data: any){
    if(data){
      this.notify.next(data);
    }
  }
}
