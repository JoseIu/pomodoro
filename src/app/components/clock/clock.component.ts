import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'clock-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnInit {
  @Input() public minutes: number = 1;
  @Input() public rest: number = 0;

  public totalTime?: number;
  public timeLeft: number = 0;

  public totalPorcent = 0;
  public acutalPorcent = 0;
  public grados = 0;

  public stop$ = new Subject();

  ngOnInit() {
    this.totalTime = this.minutes * 60;
    this.timeLeft = this.totalTime;
  }

  public startTimer() {
    console.log('hola');
    timer(0, 1000)
      .pipe(
        tap(() => {
          if (this.timeLeft !== undefined && this.totalTime !== undefined) {
            this.timeLeft--;
            this.totalPorcent = (this.timeLeft / this.totalTime) * 100;
            this.acutalPorcent = 100 - this.totalPorcent;
            this.grados = (this.acutalPorcent * 360) / 100;
            console.log({ porcetanjeActual: this.acutalPorcent });
            if (this.timeLeft === 0) {
              this.stop$.next(0);
            }
          }
        }),
        takeUntil(this.stop$)
      )
      .subscribe();
  }

  public stopTimer() {
    this.stop$.next(0);
  }
}
