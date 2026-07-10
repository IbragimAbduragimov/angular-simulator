import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { IUser } from './interfaces/IUser';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  userApiService: UserApiService = inject(UserApiService);
  loaderService: LoaderService = inject(LoaderService);

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
    this.loaderService.showLoader();
    if (this.cacheUsers.length > 0) {
      return of(this.cacheUsers);
    } else {
      return this.userApiService.getUsers().pipe(
        catchError((err: Error) => {
          console.error('ошибка загрузки', err);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
    }
  }

  addUser(user: IUser): void {
    this.setUsers([...this.getUser(), user]);
  }

  deleteUser(userToRemove: IUser): void {
    const users: IUser[] = this.getUser().filter((user: IUser) => user.id !== userToRemove.id);
    this.setUsers(users);
  }
}
