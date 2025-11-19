import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';
import { ResultsComponent } from './pages/results/results.component';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'analyze', component: AnalyzeComponent, canActivate: [roleGuard(['writer'])] },
  { path: 'results', component: ResultsComponent, canActivate: [roleGuard(['writer', 'reader'])] },
  { path: '**', redirectTo: 'login' },
];
