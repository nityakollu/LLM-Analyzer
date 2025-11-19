import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  role: 'writer' | 'reader';
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';
  role = signal<'writer' | 'reader' | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const platformId = inject(PLATFORM_ID);
    let savedRole: 'writer' | 'reader' | null = null;
    if (isPlatformBrowser(platformId) && typeof localStorage?.getItem === 'function') {
      savedRole = localStorage.getItem('role') as 'writer' | 'reader' | null;
    }
    this.role.set(savedRole);
  }

  private hasStorage() {
    return typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function';
  }

  login(username: string, password: string) {
    this.http.post<LoginResponse>(`${environment.api}/auth/login`, { username, password }).subscribe({
      next: (res) => {
        if (this.hasStorage()) {
          localStorage.setItem(this.TOKEN_KEY, res.token);
          localStorage.setItem('role', res.role);
        }
        this.role.set(res.role);
        this.router.navigateByUrl('/results');
      },
      error: () => alert('Login failed'),
    });
  }

  logout() {
    if (this.hasStorage()) localStorage.clear();
    this.role.set(null);
    this.router.navigate(['/login']);
  }

  get token(): string | null {
    if (!this.hasStorage()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isWriter() {
    return this.role() === 'writer';
  }

  get isLoggedIn(): boolean {
    return this.role() !== null;
  }
}
