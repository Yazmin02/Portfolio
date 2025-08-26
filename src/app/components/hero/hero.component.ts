import { Component, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef, Renderer2, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import Typed from 'typed.js';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgParticlesModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  name = 'Yazmín Berenice González Meneses';
  description = `Ingeniera en Sistemas Computacionales egresada del IPN, 
con experiencia en análisis de datos, inteligencia artificial, desarrollo de software, 
así como desarrollo móvil.`;

  @ViewChild('typedElement', { static: true }) typedEl!: ElementRef;

  private typedInstance: any;
  private isBrowser = false;

  particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: "#888888" },
      links: { enable: true, distance: 150, color: "#bbbbbb", opacity: 0.3 },
      move: { enable: true, speed: 1 },
      number: { value: 50 },
      size: { value: { min: 1, max: 3 } }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100 } }
    },
    detectRetina: true
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // Inicializa Typed.js
    this.typedInstance = new Typed(this.typedEl.nativeElement, {
      strings: [
        'Ingeniera en Sistemas Computacionales',
        'Desarrolladora Web Frontend',
        'Inteligencia Artificial',
        'Data Analyst'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: false
    });
  }

  ngOnDestroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}
