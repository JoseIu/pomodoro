import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TasksComponent } from './components/tasks/tasks.component';
import { TimerComponent } from './components/timer/timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimerComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pomodoro';
}
