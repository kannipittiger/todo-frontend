import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialog } from './todo-dialog/todo-dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface TodoItem {
  id: number;
  name: string;
  owner: string;
  statusId: number;
}

@Component({
  selector: 'app-todo-page',
  imports: [CommonModule],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage {
  private dialog = inject(MatDialog);
  private todo = inject(TodoService);

  todolst = signal<PagedResult<TodoItem> | null>(null);

  ngOnInit(): void {
    this.loadTodo(1);
  }

  getTodoList() {
    this.todo.getTodoList({ Page: 1, PageSize: 10 }).subscribe({
      next: (res) => {
        console.log('SUCCESS', res);
        this.todolst.set(res);
      },
      error: (err) => {
        console.error('ERROR', err);
      },
    });
  }

  loadTodo(page: number) {
    this.todo.getTodoList({ Page: page, PageSize: 10 }).subscribe((res) => {
      this.todolst.set(res);
    });
  }

  changePage(page: number) {
    this.loadTodo(page);
  }

  OpenDialog(data: any) {
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '600px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadTodo(this.todolst()!.page);
    });
  }

  deleteTodo(data: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This todo will be permanently deleted',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.todo.deleteTodoList(data).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Todo has been deleted.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadTodo(this.todolst()!.page);
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Delete failed',
          });
        },
      });
    }
  });
}

}
