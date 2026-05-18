import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new BehaviorSubject<unknown | undefined>(undefined);

  user$: Observable<unknown> = this.userSubject.asObservable();

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService)
  users$ = this.userApi.getUsers();
  
  
  setUsers(value: unknown) {
    this.userSubject.next(value);
  }

  getUser() {
    this.user$.subscribe()
  }

  loadUsers() {
    return this.userApi.getUsers()
      .pipe(
        tap(() => this.loader.showLouder()),
        catchError((err: any) => {
          console.error('ошибка загрузки', err);
          return of([]);
        }),
        finalize(() => {
          this.loader.hideLoader();
        })
      )
  }
}
