import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ILogin } from '../ILogin';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../../message.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private messageSevice: MessageService = inject(MessageService);

  loginForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login(): void {
    const formValue: ILogin = this.loginForm.value;
    const convertedData: ILogin = { ...formValue };
    this.authService
      .login(convertedData)
      .pipe(
        tap(() => this.router.navigate([''])),
        catchError((error: HttpErrorResponse) => {
          this.messageSevice.showError('произошла ошибка');
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
