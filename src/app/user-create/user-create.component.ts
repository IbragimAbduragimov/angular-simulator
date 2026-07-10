import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../user.service';
import { GradientHoverDirective } from '../gradient-hover.directive';
import { BoldOnHoverDirective } from '../boldOnHover-directive';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule,
    BoldOnHoverDirective,
    GradientHoverDirective,
    BoldOnHoverDirective,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder);

  userService: UserService = inject(UserService);

  userForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.nonNullable.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.nonNullable.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      }),
    }),
    company: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]],
    }),
  });

  onSubmitForm(): void {
    const user: IUser = { ...this.userForm.value, id: Date.now() };
    this.createUser.emit(user);
  }
}
