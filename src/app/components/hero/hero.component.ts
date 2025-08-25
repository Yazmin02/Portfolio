import { Component, AfterViewInit } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgParticlesModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  name = 'Yazmín Berenice González Meneses';
  description = `Ingeniera en Sistemas Computacionales egresada del IPN, 
  con experiencia en análisis de datos, inteligencia artificial, desarrollo de software, 
  así como desarrollo móvil.`;

  particlesOptions: any = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: { value: 50, density: { enable: true, area: 900 } },
      color: { value: ["#00f2ff", "#ff00f2", "#00ff9f"] },
      shape: { type: ["circle","triangle","polygon"] },
      opacity: { value: 0.6, random: { enable: true, minimumValue: 0.3 } },
      size: { value: { min: 2, max: 5 }, random: true },
      links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1.2 },
      move: { enable: true, speed: 1.2, direction: "none", straight: false, outModes: { default: "out" } }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 120 }, push: { quantity: 4 } }
    },
    detectRetina: true
  };

  ngAfterViewInit() {
    const options = {
      strings: [
        'Ingeniera en Sistemas Computacionales',
        'Desarrolladora Web Frontend & Backend',
        'Inteligencia Artificial',
        'Data Analyst'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    };
    new Typed('#typed-title', options);
  }
}
