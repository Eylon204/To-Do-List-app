import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  
  updateTask(taskId:number, task:Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`,task)
  }

deleteTask(taskId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/${taskId}`)
}
}
