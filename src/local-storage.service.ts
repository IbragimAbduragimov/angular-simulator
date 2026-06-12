import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root', 
})
export class LocalStorageService {
 
  addKey<T>(key: string, newCount: T): void {
    if (typeof newCount === 'string') {
      localStorage.setItem(key, newCount);
    } else {
      const newCountString: string = JSON.stringify(newCount);
      localStorage.setItem(key, newCountString); 
    } 
  }

  getKey<T>(key: string) {
    const value: string | null = localStorage.getItem(key); 
    if (typeof value === 'string') {
      return value;
    } else {
      return value ? JSON.parse(value) : null;
    }
  }

  clearKey(key: string): void {
    localStorage.removeItem(key); 
  }

  clearAll(): void { 
    localStorage.clear();
  }
  
}
 