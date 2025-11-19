import { Component, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  template: `
    <h2>Text Analysis</h2>
    <div *ngIf="auth.isWriter" class="section-gap">
      <textarea rows="4" [(ngModel)]="text" placeholder="Enter text to analyze"></textarea>
      <br>
      <button (click)="add()" [disabled]="loading||!text">{{ loading? 'Analyzing...' : 'Analyze' }}</button>
    </div>
    <button (click)="refresh()">Refresh</button>
    <table *ngIf="rows().length" border="1">
      <tr><th>Text</th><th>Summary</th><th>Sentiment</th><th>User</th><th>Date</th></tr>
      <tr *ngFor="let r of rows()">
        <td>{{ r.text }}</td>
        <td>{{ r.summary }}</td>
        <td>{{ r.sentiment }}</td>
        <td>{{ r.createdBy }}</td>
        <td>{{ r.createdAt | date:'short' }}</td>
      </tr>
    </table>
    <p *ngIf="!rows().length">No data</p>
  `,
})
export class ResultsComponent {
  rows = signal<any[]>([]);
  text='';
  loading=false;
  constructor(private api: ApiService, public auth:AuthService){ this.refresh(); }
  refresh(){ this.api.getAnalyses().subscribe(data=>this.rows.set(data)); }
  add(){
    this.loading=true;
    this.api.analyze(this.text).subscribe({
      next:(res)=>{ this.text=''; this.loading=false; this.refresh(); },
      error:(e)=>{ this.loading=false; alert(e.error?.detail||e.message); }
    });
  }
}
