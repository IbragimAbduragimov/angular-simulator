import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private http: HttpClient = inject(HttpClient);

  getUsers(): Observable<object> { 
    return this.http.get<object>('https://jsonplaceholder.typicode.com/users');
  }

}
