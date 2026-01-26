import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoItem {
  id?: number;
  name?: string;
  statusId?: number;
  owner?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodoList(todo: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/Todo/GetTodoList', todo);
  }

  saveTodoList(todo: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/Todo/SaveTodoList', todo);
  }

  deleteTodoList(todo: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/Todo/DelTodoList', todo);
  }

  getTodoMasterStatuses(): Observable<any> {
    return this.http.get('http://localhost:5000/api/Todo/GetTodoMasterStatuses');
  }
}
