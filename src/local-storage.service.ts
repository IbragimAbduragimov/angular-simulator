/* eslint-disable @typescript-eslint/no-explicit-any */
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

  getKey(key: string): any | null {
    const value: string | null = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  }

  clearKey(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
