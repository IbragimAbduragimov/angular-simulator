import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from "../users-filter/users-filter.component";
import { UserCardComponent } from "../user-card/user-card.component";
import { GradientHoverDirective } from "../gradient-hover.directive";
import { PrularPipe } from '../plural.pipe';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, FormsModule, UserCreateComponent, UsersFilterComponent, UserCardComponent, PrularPipe, GradientHoverDirective],
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
