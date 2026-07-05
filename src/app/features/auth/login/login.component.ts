import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../../../local-storage.service';
import { IToken } from '../IToken';
import { Router } from '@angular/router';
import { ILogin } from '../ILogin';
import { IAuthResponse } from '../IAuthResponse';

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

  loginForm: FormGroup = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  login(): Promise<boolean> {
    const formValue: ILogin = this.loginForm.value;
    const convertedData: ILogin = { ...formValue };
    this.authService.login(convertedData).subscribe();
    return this.router.navigate(['']);
  }

}
