import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
    <h1 class="app-title">Task Manager</h1>

      <!-- Create Task Card -->
      <section class="task-form card">
      <h3>Create New Task</h3>
      <form (ngSubmit)="addTask()" class="form-row">
        <input type="text" [(ngModel)]="newTaskTitle" name="title" placeholder="Task title..." />
        <select [(ngModel)]="newTaskPriority" name="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" class="btn-primary">Add Task</button>
      </form>
      <p *ngIf="errorMessage" style="color: var(--color-high); font-size: 0.9rem; font-weight: 500; margin-top: 0.5rem;">{{ errorMessage }}</p>
      </section>

      <!-- Filter Section -->
      <section class="filters card">
      <h3>Filter Tasks</h3>
      <label>Priority: </label>
      <select [(ngModel)]="selectedPriority" (ngModelChange)="applyFilters()" style="width: 100%;">
      <option value="All">All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
      </select>
      </div>

      <div class="filter-group" style="flex: 1;">
      <label>Status: </label>
      <select [(ngModel)]="selectedStatus" (ngModelChange)="applyFilters()" style="width: 100%;">
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Active">Active</option>
    </select>
    </div>
    </div>
    </section>

  <!-- Task List Card -->
  <section class="task-list card">
  <h3>Tasks</h3>

    <div *ngFor="let task of filteredTasks" class="task-item {{ task.priority }}">
    <div class="task-content">
    <span class="task-title" [class.completed]="task.completed"> {{ task.title }}</span>
    <span *ngIf="!task.completed" class="task-priority-badge">Priority: {{ task.priority }}</span>
    <span *ngIf="task.completed" class="task-status-done">Done</span>
    </div>

    <button *ngIf="!task.completed" (click)="completedTask(task.id)" class="btn-complete">
    Mark Complete
    </button>
    </div>

    <p *ngIf="filteredTasks.length === 0" class="empty-message">No tasks found.</p>
  </section>
  </div>
  `
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
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
      this.applyFilters();

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

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const priorityMatch = this .selectedPriority === 'All' || task.priority === this.selectedPriority;
      const statusMatch = this.selectedStatus === 'All' || (this.selectedStatus === 'Completed' ? task.completed : !task.completed);
      return priorityMatch && statusMatch;
    });
  }
}