import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'clock-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent implements OnChanges {
  @Input() public workTime: number = 0;
  @Input() public breakTime: number = 0;

  public isFocus: boolean = false;

  //in seconds
  public totalTime?: number;
  public timeLeft: number = 0;

  public totalPorcent = 0;
  public acutalPorcent = 0;
  public grados = 0;

  public stop$ = new Subject();

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes: changes });
    if (changes['workTime'] || changes['breakTime']) {
      this.totalTime = this.workTime * 60;
      this.timeLeft = this.totalTime;
    }
  }

  public startTimer() {
    timer(0, 1000)
      .pipe(
        tap(() => {
          if (this.timeLeft !== undefined && this.totalTime !== undefined) {
            this.timeLeft--;
            this.totalPorcent = (this.timeLeft / this.totalTime) * 100;
            this.acutalPorcent = 100 - this.totalPorcent;
            this.grados = (this.acutalPorcent * 360) / 100;
            this.isFocus = true;
            console.log({ porcetanjeActual: this.acutalPorcent });
            if (this.timeLeft === 0) {
              this.stop$.next(0);
              this.isFocus = false;
            }
          }
        }),
        takeUntil(this.stop$)
      )
      .subscribe();
  }

  public pauseTimer() {
    this.stop$.next(0);
    this.isFocus = false;
  }
  public resetTimer() {
    this.stop$.next(0);
    this.totalTime = this.workTime * 60;
    this.timeLeft = this.totalTime;
    this.grados = 0;

    this.isFocus = false;
  }
}
