import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  addKey<T>(Key: string, newCount: T[]) {
    const newCountString: string = newCount.toString();
    localStorage.setItem(Key, newCountString);
  }

  getKey(Key: string) {
    return localStorage.getItem(Key);
  }

  clearKey(Key: string) {
    localStorage.removeItem(Key);
  }

  clearAll() {
    localStorage.clear();
  }
}
