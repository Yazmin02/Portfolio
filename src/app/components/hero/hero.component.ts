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
  showRightCards = false;

  name = 'Yazmín Berenice González Meneses';
  description = `Ingeniera en Sistemas Computacionales egresada del IPN, 
con experiencia en análisis de datos, inteligencia artificial, desarrollo de software, 
así como desarrollo móvil.`;

  @ViewChild('typedElement', { static: true }) typedEl!: ElementRef;
  @ViewChild('rightCards', { static: true }) rightCards!: ElementRef;
  @ViewChild('leftCard', { static: true }) leftCard!: ElementRef;

  private typedInstance: any;
  private timeoutIds: any[] = [];

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
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    console.log('Hero component initialized'); // Debug
    // Iniciar la secuencia de animación
    this.startAnimationSequence();
  }

  private startAnimationSequence() {
    if (!isPlatformBrowser(this.platformId)) return;
  
    // Paso 1: Mostrar las right cards
    const showCardsTimeout = setTimeout(() => {
      this.showRightCards = true;
      this.cdr.detectChanges(); // fuerza que Angular aplique la clase "two-columns"
  
      // Paso 2: Inicializar Typed.js
      const typedTimeout = setTimeout(() => {
        this.initializeTyped();
      }, 500);
      this.timeoutIds.push(typedTimeout);
  
      // Paso 3: Ajustar altura de left-card
      const adjustHeightTimeout = setTimeout(() => {
        this.adjustLeftCardHeight();
      }, 500);
      this.timeoutIds.push(adjustHeightTimeout);
  
    }, 100); // reduce el delay para que no dependa del scroll
    this.timeoutIds.push(showCardsTimeout);
  }
  

  private initializeTyped() {
    if (this.typedEl && this.typedEl.nativeElement) {
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
        showCursor: false,
        cursorChar: '|'
      });
    }
  }

  private adjustLeftCardHeight() {
    if (this.rightCards && this.leftCard) {
      const rightHeight = this.rightCards.nativeElement.offsetHeight;
      console.log('Right cards height:', rightHeight); // Debug
      
      if (rightHeight > 0) {
        this.renderer.setStyle(this.leftCard.nativeElement, 'height', `${rightHeight}px`);
        this.cdr.detectChanges();
        console.log('Height adjusted to:', rightHeight); // Debug
      } else {
        // Si aún no hay altura, reintenta después
        this.timeoutIds.push(setTimeout(() => {
          this.adjustLeftCardHeight();
        }, 200));
      }
    }
  }

  ngOnDestroy() {
    // Limpiar timeouts
    this.timeoutIds.forEach(id => clearTimeout(id));
    
    // Destruir instancia de Typed.js
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }
}
