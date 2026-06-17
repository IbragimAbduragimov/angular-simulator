import { Component, inject } from '@angular/core';
import { UserService } from '../app/user.service';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../app/user-api.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../app/interfaces/IUser';
import { UserCreateComponent } from '../app/user-create/user-create.component';
import { UsersFilterComponent } from "../app/users-filter/users-filter.component";
import { UserCardComponent } from "../app/user-card/user-card.component";
import { CurrectPipe } from '../app/currect.pipe';
import { GradientHowerDirective } from "../app/gradient-hower.directive";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, FormsModule, UserCreateComponent, UsersFilterComponent, UserCardComponent, CurrectPipe, GradientHowerDirective],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  userApiService: UserApiService = inject(UserApiService);

  
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([this.userService.users$, this.filterSubject])
    .pipe(
      map(([users, filter]) => users.filter((user: IUser) => user.name.toLowerCase().includes(filter.toLowerCase()))),
    );

  ngOnInit() {
    this.userService.loadUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user)),
      ).subscribe();
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
  }

  filterUsers(value: string): void {
    this.filterSubject.next(value);
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }

}
