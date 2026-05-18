import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject: BehaviorSubject<unknown> = new BehaviorSubject<unknown | undefined>(undefined);

  user$: Observable<unknown> = this.userSubject.asObservable();

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  users$: Observable<any> = this.userApi.getUsers();
  
  
  setUsers<T>(value: T): void {
    this.userSubject.next(value);
  }

  getUser(): void {
    this.user$.subscribe();
  }

  loadUsers(): Observable<any> {
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
