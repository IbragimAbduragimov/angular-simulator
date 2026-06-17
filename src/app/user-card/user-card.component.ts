import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../user.service';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CurrectPipe } from '../currect.pipe';
import { FormatContactsPipe } from '../format-contacts.pipe';
import { Phone } from '../../enums/Phone';
import { BoldHowerDirective } from '../bold.directive';
import { GradientHowerDirective } from "../gradient-hower.directive";

@Component({
  selector: 'app-user-card',
  imports: [AsyncPipe, UpperCasePipe, FormatContactsPipe, BoldHowerDirective, GradientHowerDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  userService: UserService = inject(UserService);

  phone = Phone;


  removeUser(id: number): void {
    this.deleteUser.emit(id);
  }

}
