import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../interfaces/task.interface';
import { CheckIconComponent } from '../icons/check-icon/check-icon.component';
import { CircleIconComponent } from '../icons/circle-icon/circle-icon.component';
import { DeleteIconComponent } from '../icons/delete-icon/delete-icon.component';
import { EditIconComponent } from '../icons/edit-icon/edit-icon.component';

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
  private fb = inject(FormBuilder);
  public tasks: Task[] = [];

  //Variable is used to save the id of the task that we are editing
  public editingTaskID?: string;
  public isEditingTask: boolean = false;

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

    const taskValue = this.taskForm.value.task;

    if (!this.tasks) return;

    //Check if the task is already in the list (when we Edit the task)
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === this.editingTaskID
    );

    if (taskIndex !== -1) {
      this.tasks[taskIndex].task = taskValue;
      this.editingTaskID = '';
      this.saveTaskToLocalStorage();

      this.isEditingTask = false;
      this.taskForm.reset();
      return;
    }

    this.tasks.push({ id: uuidv4(), task: taskValue, isCompleted: false });

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
  public edittask(id: string) {
    const taskFound = this.tasks.find((task) => task.id === id);

    if (!taskFound) return;

    this.isEditingTask = true;

    this.taskForm.setValue({ task: taskFound.task });
    this.editingTaskID = taskFound.id;
  }
  public deteletask(id: string) {
    const taskFound = this.tasks.find((task) => task.id === id);

    if (!taskFound) return;
    this.tasks = this.tasks.filter((task) => task.id !== taskFound.id);
    this.saveTaskToLocalStorage();
  }
}
