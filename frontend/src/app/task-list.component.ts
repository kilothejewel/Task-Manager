import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  template: `
    <div *ngFor="let task of tasks">
      {{ task.title }} - {{ task.priority }}
      <button (click)="completeTask(task.id)">Complete</button>
    </div>
  `
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
   
    this.http.get('/api/tasks').subscribe((data: any) => {
      this.tasks = data;
    });
  }

  completeTask(id: number) {
   
    this.http.put('/api/tasks/' + id, {}).subscribe(() => {
      this.loadTasks();
    });
  }
}