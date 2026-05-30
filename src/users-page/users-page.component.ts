import { Component, inject } from '@angular/core';
import { UserService } from '../app/user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../app/user-api.service';
import { tap } from 'rxjs';
import { IUser } from '../app/interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  userApiService: UserApiService = inject(UserApiService);

  constructor () {
    this.userService.loadUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user)),
      ).subscribe();
  }


}
