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

  userApi: UserApiService = inject(UserApiService);
  userService: UserService = inject(UserService);
  loader: LoaderService = inject(LoaderService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  usersInfo$: Observable<IUser[]> = this.userApi.getUsers();
  
  
  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUser(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loader.showLoader();
    return this.userApi.getUsers()
      .pipe(
        catchError((err: Error) => {
          console.error('ошибка загрузки', err);
          return of([]);
        }),
        finalize(() => {
          this.loader.hideLoader();
        })
      )
    }
  }
