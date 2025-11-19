import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>New Analysis</h2>
    <textarea rows="6" [(ngModel)]="text"></textarea><br>
    <button (click)="run()" [disabled]="!text || loading">{{ loading ? 'Analyzing...' : 'Analyze'}}</button>
  `,
})
export class AnalyzeComponent {
  text = '';
  loading = false;
  constructor(private api: ApiService) {}

  run() {
    this.loading = true;
    this.api.analyze(this.text).subscribe({
      next: () => {
        this.loading = false;
        this.text = '';
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.detail || err.message);
      },
    });
  }
}
