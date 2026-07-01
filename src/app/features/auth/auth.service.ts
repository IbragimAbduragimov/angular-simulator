import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { IAuthUser } from './IAuthUser';
import { ILogin } from './ILogin';
import { IAuthResponse } from './IAuth-response';
import { IToken } from './IToken';
import { LocalStorageService } from '../../../local-storage.service';
import { MessageService } from '../../../message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);

  private currentUserSubject: BehaviorSubject<IAuthResponse | null> = new BehaviorSubject<IAuthResponse | null>(null);
  currentUser$: Observable<IAuthResponse | null> = this.currentUserSubject.asObservable();
  isLogin: boolean = this.localStorageService.getKey('tokens') ? true : false;

  private tokenUrl: string = 'https://dummyjson.com/auth';

  setUser(user: IAuthResponse): void {
    this.currentUserSubject.next(user);
  }

  getUser(): IAuthResponse | null {
    return this.currentUserSubject.getValue();
  }

  setTokens(token: IToken): void {
    this.localStorageService.addKey('tokens', token);
  }

  getTokens(): IToken | null {
    return this.localStorageService.getKey('tokens');
  }

  login(login: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.tokenUrl }/login`, login).pipe(
      tap((response: IAuthResponse) => {
        this.setUser(response);
        this.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      })
    );
  }

  getCurrentUser(token: IToken): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.tokenUrl }/me`, {
      headers: { 
        Authorization: `Bearer ${ token.accessToken }`,
    }});
  }

  refresh(): Observable<IToken> {
    const tokens: IToken | null = this.getTokens();
    return this.http.post<IToken>(`${ this.tokenUrl }/refresh`, { refreshToken: tokens?.refreshToken }).pipe(
      tap((tokens: IToken) => { this.setTokens(tokens) }),
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.clearKey('tokens');
  }

}
