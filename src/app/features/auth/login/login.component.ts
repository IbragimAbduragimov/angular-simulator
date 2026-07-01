import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../../../local-storage.service';
import { IToken } from '../IToken';
import { Router } from '@angular/router';
import { ILogin } from '../ILogin';
import { IAuthResponse } from '../IAuth-response';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  token: IToken = this.localStorageService.getKey('tokens');

  loginForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  authUser(): Promise<boolean> {
    const formValue: ILogin = this.loginForm.value;
    const convertedData: ILogin = { ...formValue }
    this.authService.login(convertedData).subscribe();
    return this.router.navigate(['']);
  }

}
