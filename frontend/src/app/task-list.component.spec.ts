import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
 let component: TaskListComponent;
 let fixture: ComponentFixture<TaskListComponent>;

 const mockTasks = [
    { id: 1, title: 'Unit Test Task 1', priority: 'High', completed: false },
    { id: 2, title: 'Unit Test Task 2', priority: 'Low', completed: true }
 ];

 const MockHttpClient = {
    get: (url: string) => {
        if (url === '/api/tasks') {
            return of(mockTasks);
        }
        return of([]);
    },
    post: (url: string, body: any) => of({}),
    put: (url: string, body: any) => of({})
 };

 beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TaskListComponent],
        providers: [
            { provide: HttpClient, useValue: MockHttpClient }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
 });


 it('should display tasks after retrieval', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const taskElements = compiled.querySelectorAll('.task-list div');

    expect(taskElements.length).toBe(2);

    expect(taskElements[0].textContent).toContain('[High] Unit Test Task 1');
    expect(taskElements[1].textContent).toContain('[Low] Unit Test Task 2');
    
    });
});