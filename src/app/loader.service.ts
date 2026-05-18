import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.isLoadingSubject.asObservable();


  showLouder(): void {
    this.isLoadingSubject.next(true);
  }

  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }
}
