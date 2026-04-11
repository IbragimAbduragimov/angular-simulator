import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root', 
})
export class LocalStorageService {
 
  addKey<T>(key: string, newCount: T[]): void {
    const newCountString: string = newCount.toString();
    localStorage.setItem(key, newCountString); 
  }

  getKey(key: string): string | null { 
    return localStorage.getItem(key);
  } 

  clearKey(key: string): void {
    localStorage.removeItem(key); 
  }

  clearAll(): void { 
    localStorage.clear();
  }
}
 