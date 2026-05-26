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

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  loader: LoaderService = inject(LoaderService);
  usersInfo$: Observable<IUser[]> = this.userApi.getUsers();
  
  
  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUser(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    of()
      .pipe(
        tap(() => this.loader.showLoader()),
        catchError((err: Error) => {
          console.error('ошибка загрузки', err);
          return of([]);
        }),
      )
    return this.userApi.getUsers()
    .pipe(
      finalize(() => {this.loader.hideLoader();})
    )
  }
}
