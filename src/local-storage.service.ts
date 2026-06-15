import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root', 
})
export class LocalStorageService {
 
  addKey<T>(key: string, newCount: T): void {
    const newCountString: string = JSON.stringify(newCount);
    localStorage.setItem(key, newCountString); 
  }

  getKey<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  clearKey(key: string): void {
    localStorage.removeItem(key); 
  }

  clearAll(): void { 
    localStorage.clear();
  }
  
}
 