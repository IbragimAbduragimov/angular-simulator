import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../user.service';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormatContactsPipe } from '../format-contacts.pipe';
import { GradientHowerDirective } from "../gradient-hower.directive";
import { PhoneMode } from '../../enums/PhoneMode';
import { BoldOnHoverDirective } from '../bold.directive';
import { prularPipe } from '../plural.pipe';

@Component({
  selector: 'app-user-card',
  imports: [AsyncPipe, UpperCasePipe, FormatContactsPipe, BoldOnHoverDirective, GradientHowerDirective, prularPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  userService: UserService = inject(UserService);

  phone: typeof PhoneMode = PhoneMode;


  removeUser(id: number): void {
    this.deleteUser.emit(id);
  }

}
