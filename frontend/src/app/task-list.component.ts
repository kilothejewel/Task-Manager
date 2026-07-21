import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngFor="let task of tasks">
      {{ task.title }} - {{ task.priority }}
      <button (click)="completeTask(task.id)">Complete</button>
    </div>
  `
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskPriority: string = 'Low';
  selectedPriority: string = 'All';
  selectedStatus: string = 'All';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
   
    this.http.get('/api/tasks').subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      this.errorMessage = 'Task title cannot be empty!';
      return;
    }
    this.errorMessage = '';
    const newTask = { title: this.newTaskTitle, priority: this.newTaskPriority };

    this.http.post('/api/tasks', newTask).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  completeTask(id: number) {
   
    this.http.put('/api/tasks/' + id, {}).subscribe(() => {
      this.loadTasks();
    });
  }
}