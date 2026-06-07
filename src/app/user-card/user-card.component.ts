import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [AsyncPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  userService: UserService = inject(UserService)

  @Input({ required: true }) user!: IUser;
  @Output() DeleteUser: EventEmitter<number> = new EventEmitter<number>();

  deleteUsers(id: number): void {
    this.DeleteUser.emit(id);
  }

}
