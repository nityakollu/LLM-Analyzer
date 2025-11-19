import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `
    <nav style="margin-bottom:10px;">
      <button *ngIf="!loggedIn" routerLink="/login">Login</button>
      <button *ngIf="auth.isWriter" routerLink="/analyze">New Analysis</button>
      <button *ngIf="loggedIn" routerLink="/results">Results</button>
      <button *ngIf="loggedIn" (click)="logout()">Logout</button>
    </nav>
    <div class="container">
    <router-outlet />
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('frontend');
  constructor(public auth: AuthService) {}

  get loggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  logout(): void {
    this.auth.logout();
  }
}
