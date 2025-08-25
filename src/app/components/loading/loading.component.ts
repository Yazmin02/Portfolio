import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Output() finished = new EventEmitter<void>();
  progress = 0;
  showName = false;

  ngOnInit() {
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.showName = true;
          setTimeout(() => this.finished.emit(), 1500);
        }, 300);
      }
    }, 30);
  }
}
