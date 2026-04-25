import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAuthenticatedSubject.next(isLoggedIn);
  }

  login(username: string, password: string): boolean {
    // Hardcoded credentials as per existing login page
    if (username === 'admin001' && password === '12316845') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
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
