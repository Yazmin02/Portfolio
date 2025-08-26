import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  dx: string;
  dy: string;
  size: number;
  opacity: number;
}

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
  finishedAnimation = false;
  particles: Particle[] = [];

  ngOnInit() {
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
        this.addParticle();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.showName = true;
          setTimeout(() => this.triggerFinish(), 800); // animación de salida
        }, 300);
      }
    }, 30);
  }

  addParticle() {
    const dx = (Math.random() * 60 - 30) + 'px';
    const dy = (Math.random() * -50 - 20) + 'px'; // siempre sube
    const size = Math.random() * 6 + 4; // 4px a 10px
    const opacity = Math.random() * 0.8 + 0.2;

    this.particles.push({
      x: 50 + (Math.random() * 60 - 30),
      y: 0,
      dx,
      dy,
      size,
      opacity
    });

    if (this.particles.length > 80) this.particles.shift();
  }

  triggerFinish() {
    this.finishedAnimation = true; // activa animación de salida global
    setTimeout(() => this.finished.emit(), 1000); // luego de animación, se muestra app
  }
}
