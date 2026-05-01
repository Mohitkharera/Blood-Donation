import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/login`, { username, password }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('username', res.username || username);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('username');
  }
}
