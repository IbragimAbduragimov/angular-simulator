import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { IAuthUser } from './IAuthUser';
import { ILogin } from './ILogin';
import { IAuthResponse } from './IAuthResponse';
import { IToken } from './IToken';
import { LocalStorageService } from '../../../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  private currentUserSubject: BehaviorSubject<IAuthResponse | IAuthUser | null> = new BehaviorSubject<IAuthResponse | IAuthUser | null>(null);
  currentUser$: Observable<IAuthResponse | IAuthUser | null> = this.currentUserSubject.asObservable();

  private apiUrl: string = 'https://dummyjson.com/auth';

  setUser(user: IAuthResponse | IAuthUser): void {
    this.currentUserSubject.next(user);
  }

  getUser(): IAuthResponse | IAuthUser | null {
    return this.currentUserSubject.getValue();
  }

  setTokens(token: IToken): void {
    this.localStorageService.addKey('tokens', token);
  }

  getTokens(): IToken | null {
    return this.localStorageService.getKey('tokens');
  }

  login(login: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, login).pipe(
      tap((response: IAuthResponse) => {
        this.setUser(response);
        this.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      })
    );
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.apiUrl }/me`).pipe(
      tap((user: IAuthUser) => this.setUser(user))
    );
  }

  refreshToken(): Observable<IToken> {
    const tokens: IToken | null = this.getTokens();
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, { refreshToken: tokens?.refreshToken }).pipe(
      tap((tokens: IToken) => this.setTokens(tokens)),
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.clearKey('tokens');
  }

}
