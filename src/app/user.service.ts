import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from './loader.service';
import { IUser } from './interfaces/IUser';
import { LocalStorageService } from '../local-storage.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  userApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  cacheUsers: IUser[] = this.localStorageService.getKey<IUser[]>('users') ?? [];
  
  
  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
    this.localStorageService.addKey('users', user);
  }

  getUser(): IUser[] {
    return this.usersSubject.getValue();
  }
  

  loadUsers(): Observable<IUser[]> {
    this.loader.showLoader();
    if (this.cacheUsers.length > 0) {
      return of(this.cacheUsers);
    } {
    return this.userApi.getUsers()
      .pipe(
        catchError((err: Error) => {
          console.error('ошибка загрузки', err);
          alert('error')
          return of([]);
        }),
        finalize(() => this.loader.hideLoader())
      )
    }
  }

  addUser(user: IUser): void {
    this.setUsers([...this.getUser(), user]);
  }
}
