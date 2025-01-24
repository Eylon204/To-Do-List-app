import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  tasks: Task[] = []; // רשימת המשימות הקיימות
  task: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
  };

  constructor(private taskService: TaskService) {}

  addTask(): void {
    // Create ID for Task
    const newId = this.tasks.length > 0 
      ? Math.max(...this.tasks.map(task => task.id)) + 1 
      : 1;
    this.task.id = newId;

    // add a new Task
    this.taskService.addTask(this.task).subscribe((newTask) => {
      console.log('Task added:', newTask);
      this.tasks.push(newTask); // עדכון הרשימה המקומית
    });

    // איפוס הטופס
    this.task = {
      id: 0,
      title: '',
      description: '',
      completed: false,
    };
  }
}