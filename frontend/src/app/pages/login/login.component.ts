import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-wrapper">
      <form class="login-card" (ngSubmit)="submit()">
        <h2>Login</h2>
        <input name="username" [(ngModel)]="username" placeholder="Username" required>
        <input name="password" type="password" [(ngModel)]="password" placeholder="Password" required>
        <button>Login</button>
      </form>
    </div>
  `,
  styles:[`
    .login-wrapper{display:flex;align-items:center;justify-content:center;height:80vh;}
    .login-card{background:#ffffff;padding:32px 24px;border:1px solid var(--border);border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;min-width:280px;}
    .login-card input{padding:8px;border:1px solid var(--border);border-radius:4px;font-size:14px;}
    .login-card button{background:var(--primary);color:#fff;border:none;padding:8px;border-radius:4px;font-size:14px;cursor:pointer;}
    .login-card button:hover{background:var(--primary-dark);} 
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private auth: AuthService) {}

  submit() {
    this.auth.login(this.username, this.password);
  }
}
