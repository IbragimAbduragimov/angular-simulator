import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private http: HttpClient = inject(HttpClient)

  getUsers() { 
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
  }
}
