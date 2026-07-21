import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-container">
      <!-- Create Task Form -->
      <section class="task-form">
      <h3>Create New Task</h3>
      <form (ngSubmit)="addTask()">
        <input type="text" [(ngModel)]="newTaskTitle" name="title" placeholder="Task title..." />
        <select [(ngModel)]="newTaskPriority" name="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </section>

      <hr />

      <!-- Filter Section -->
      <section class="filters">
      <h3>Filter Tasks</h3>
      <label>Priority: </label>
      <select [(ngModel)]="selectedPriority">
      <option value="All">All</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </section>

  <hr />

  <!-- Task List -->
  <section class="task-list">
  <h3>Tasks</h3>
    <div *ngFor="let task of filteredTask">
    <span [style.text-decoration]="task.completed ? 'line-through' : 'none'">[{{ task.priority }}] {{ task.title }}</span>
    <button *ngIf="!task.completed" (click)="completeTask(task.id)">Mark Complete</button>
    <span *ngIf="task.completed"> (Done)</span>
    </div>
    <p *ngIf="filteredTask.length === 0">No tasks found.</p>
  </section>
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

  get filteredTask() {
    return this.tasks.filter(task => {
      const priorityMatch = this.selectedPriority === 'All' || task.priority === this.selectedPriority;
      const statusMatch = this.selectedStatus === 'All' || (this.selectedStatus === 'Completed' ? task.completed : !task.completed);
      return priorityMatch && statusMatch;
    });
  }
}