import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  progress = 0;
  showName = false;
  finishedAnimation = false;
  private intervalId: any;
  private timeoutIds: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      // En el servidor, emitir finished inmediatamente
      this.finished.emit();
      return;
    }
    
    // Iniciar loading directamente
    this.startLoading();
  }

  private startLoading() {
    this.intervalId = setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
        this.cdr.detectChanges();
      } else {
        clearInterval(this.intervalId);
        this.timeoutIds.push(setTimeout(() => {
          this.showName = true;
          this.cdr.detectChanges();
          this.timeoutIds.push(setTimeout(() => this.triggerFinish(), 800));
        }, 300));
      }
    }, 30);
  }

  triggerFinish() {
    this.finishedAnimation = true;
    this.cdr.detectChanges();
    this.timeoutIds.push(setTimeout(() => {
      this.finished.emit();
    }, 1000));
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.timeoutIds.forEach(id => clearTimeout(id));
  }
}
