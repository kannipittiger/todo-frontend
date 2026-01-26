import { Component, inject, Inject, signal } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../../services/todo-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './todo-dialog.html',
  styleUrl: './todo-dialog.css',
})
export class TodoDialog {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  private todo = inject(TodoService);

  status = signal<any>([]);

  form!: FormGroup;

  ngOnInit(): void {
    this.getMasterStatus();
    this.form = this.fb.group({
      id: [this.data?.id ?? 0],
      name: [this.data?.name ?? '', Validators.required],
      owner: [this.data?.owner ?? '', Validators.required],
      statusId: [this.data?.statusId ?? 0, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    var payload = this.setParam();

    this.todo.saveTodoList(payload).subscribe(() => { });
    this.dialogRef.close();
  }

  setParam(){
    var f = this.form.getRawValue();

    var payload = {
      id : f.id,
      name : f.name,
      owner : f.owner,
      statusId : f.statusId
    }

    return payload;
  }

  getMasterStatus(){
    this.todo.getTodoMasterStatuses().subscribe((res) => {
      this.status.set(res);
    });
  }
}
