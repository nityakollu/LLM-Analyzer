import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    const token = this.auth.token;
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getAnalyses() {
    return this.http.get<any[]>(`${environment.api}/analyses`, { headers: this.headers() });
  }

  analyze(text: string) {
    return this.http.post<any>(`${environment.api}/analyses`, { text }, { headers: this.headers() });
  }
}
