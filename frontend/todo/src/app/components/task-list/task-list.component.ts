import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,

  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editTaskId: number | null = null;
  editTask: Task = { id: 0, title: '', description: '', completed: false };
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      // מסנן רק את המשימה שנמחקה
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      console.log(`Task with id ${taskId} deleted`);
    });
  }
  
  startEdit(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.editTaskId = taskId;
      this.editTask = { ...task };
    }
  }
  saveTask(task: Task): void {
    if (this.editTaskId !== null) {
      this.taskService
        .updateTask(this.editTaskId, this.editTask)
        .subscribe((updatedTask) => {
          const index = this.tasks.findIndex((t) => t.id === this.editTaskId);
          if (index !== 1) {
            this.tasks[index] = updatedTask;
          }
          this.cancelEdit();
        });
    }
  }

  cancelEdit(): void {
    this.editTaskId = null;
    this.editTask = { id: 0, title: '', description: '', completed: false };
  }

  toggleComplete(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }
}