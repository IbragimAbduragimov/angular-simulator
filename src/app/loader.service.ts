import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader: Observable<boolean> = this.isLoading.asObservable();

  showLoader(): void {
    this.isLoading.next(true);
  }

  hideLoader(): void {
    this.isLoading.next(false);
  }
  
}
