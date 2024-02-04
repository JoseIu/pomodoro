import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CheckIconComponent } from '../icons/check-icon/check-icon.component';
import { CircleIconComponent } from '../icons/circle-icon/circle-icon.component';
import { DeleteIconComponent } from '../icons/delete-icon/delete-icon.component';
import { EditIconComponent } from '../icons/edit-icon/edit-icon.component';
interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CheckIconComponent,
    CircleIconComponent,
    EditIconComponent,
    DeleteIconComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  private fb = inject(FormBuilder);

  public taskForm: FormGroup = this.fb.group({
    task: ['', Validators.required],
  });

  ngOnInit(): void {
    const tasksSaved = JSON.parse(localStorage.getItem('tasks') || '[]');
    console.log('tasksSaved', tasksSaved);

    if (tasksSaved.length > 0) {
      this.tasks = tasksSaved;
    }
  }

  isValiedField(field: string): boolean | null {
    return (
      this.taskForm.controls[field].errors &&
      this.taskForm.controls[field].touched
    );
  }

  getFielError(field: string): string | null {
    if (!this.taskForm.controls[field]) return null;

    const errors = this.taskForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'The camp cant not be empty';
      }
    }
    return null;
  }
  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task = this.taskForm.value.task;

    if (!this.tasks) return;

    this.tasks.push({ id: uuidv4(), task, isCompleted: false });

    this.taskForm.reset();
    this.saveTaskToLocalStorage();
  }

  saveTaskToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  public completetask(id: string) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) return;

    task.isCompleted = !task.isCompleted;

    this.saveTaskToLocalStorage();
  }
  public edittask(id: string) {}
  public deteletask(id: string) {}
}
