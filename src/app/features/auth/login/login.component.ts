import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../../local-storage.service';
import { IToken } from '../IToken';
import { Router } from '@angular/router';
import { ILogin } from '../ILogin';
import { IAuthResponse } from '../IAuthResponse';
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
    password: ['', [Validators.required]]
  })

  login(): Promise<boolean> | void {
    const formValue: ILogin = this.loginForm.value;
    const convertedData: ILogin = { ...formValue };
    this.authService.login(convertedData).pipe(
      tap(() => { return this.router.navigate(['']) }),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
    ).subscribe();
  }

}
