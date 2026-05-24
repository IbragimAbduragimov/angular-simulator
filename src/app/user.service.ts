import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';
import { IUser } from './interfaces/IUser';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  user$: Observable<IUser[]> = this.userSubject.asObservable();

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);
  users$: Observable<IUser[]> = this.userApi.getUsers();
  
  
  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
  }

  getUser(): IUser[] {
    return this.userSubject.getValue()
  }

  loadUsers(): Observable<IUser[]> {
    return this.userApi.getUsers()
      .pipe(
        tap(() => this.loader.showLoader()),
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
